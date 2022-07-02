import { jugadas } from "constants";
import { listaDeJugadas } from "constants";
import { winstTo } from "constants";
import { MODO } from "constants/enums";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  descripcionVictoria,
  empate,
  jugadaSeleccionadaMaquina,
} from "./action";
import { gameReducer } from "./gameReducer";
import {
  GANO_JUGADOR_UNO_VS_MAQUINA,
  JUGAR_REVANCHA,
  SUMAR_PUNTOS_GANADOR_MULTIPLAYER,
} from "./types";

export const initialState = {
  modo: "",
  descripcionVictoria: "",
  empates: 0,
  rondas: 0,
  jugadorUno: {
    perdidos: 0,
    ganados: 0,
    nombre: "Jugador 1",
    jugadaActual: {},
  },
  jugadorDos: {
    ganados: 0,
    nombre: "Jugador 2",
    jugadaActual: {},
  },
  maquina: {
    jugadaActual: {},
    nombre: "Maquina",
  },
};

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const realizoJugadaJugadorUno =
    Object.keys(state.jugadorUno.jugadaActual).length !== 0;
  const realizoJugadaJugadorDos =
    Object.keys(state.jugadorDos.jugadaActual).length !== 0;

  const modoJugadorUno = state.modo === MODO.JUGADOR_UNO;

  const jugadaAleatoria = (max) => {
    return Math.floor(Math.random() * max) + 0;
  };

  useEffect(() => {
    if (modoJugadorUno && realizoJugadaJugadorUno) {
      const jugadaMaquina = listaDeJugadas[jugadaAleatoria(jugadas.length - 1)];
      dispatch(
        jugadaSeleccionadaMaquina(jugadaMaquina.image, jugadaMaquina.name)
      );
      const jugadorGanoJugada = jugadorUnoLeGanaAOtroJugador(
        state.jugadorUno.jugadaActual.name,
        jugadaMaquina.name
      );
      if (hayEmpate(state.jugadorUno.jugadaActual.name, jugadaMaquina.name)) {
        dispatch(empate(true));
        dispatch(
          descripcionVictoria(
            generarMensajeDescripcionPartida(
              state.jugadorUno.jugadaActual.name,
              jugadaMaquina.name
            )
          )
        );
        return;
      }
      dispatch({
        type: GANO_JUGADOR_UNO_VS_MAQUINA,
        payload: jugadorGanoJugada,
      });
      dispatch(
        descripcionVictoria(
          generarMensajeDescripcionPartida(
            state.jugadorUno.jugadaActual.name,
            jugadaMaquina.name
          )
        )
      );
    }
  }, [state.jugadorUno.jugadaActual, state.modo, dispatch]);

  useEffect(() => {
    if (realizoJugadaJugadorUno && realizoJugadaJugadorDos) {
      ganadorEntreJugadorUnoYJugadorDos(
        state.jugadorUno.jugadaActual.name,
        state.jugadorDos.jugadaActual.name
      );
      dispatch(
        descripcionVictoria(
          generarMensajeDescripcionPartida(
            state.jugadorUno.jugadaActual.name,
            state.jugadorDos.jugadaActual.name
          )
        )
      );
    }
  }, [realizoJugadaJugadorUno, realizoJugadaJugadorDos, dispatch]);

  const ganadorEntreJugadorUnoYJugadorDos = (jugador1, jugador2) => {
    if (jugadorUnoLeGanaAOtroJugador(jugador1, jugador2)) {
      dispatch({
        type: SUMAR_PUNTOS_GANADOR_MULTIPLAYER,
        payload: { jugador: MODO.JUGADOR_UNO },
      });
    } else if (hayEmpate(jugador1, jugador2)) {
      dispatch(empate(true));
    } else {
      dispatch({
        type: SUMAR_PUNTOS_GANADOR_MULTIPLAYER,
        payload: { jugador: MODO.JUGADOR_DOS },
      });
    }
  };

  const hayEmpate = (jugador1, jugador2) => {
    return jugador1 === jugador2;
  };

  const jugadorUnoLeGanaAOtroJugador = (jugador1, jugador2) => {
    return winstTo[jugador1]?.gana.includes(jugador2);
  };

  const generarMensajeDescripcionPartida = (jugadorUno, jugadorDos) => {
    let message = "";
    if (jugadorUnoLeGanaAOtroJugador(jugadorUno, jugadorDos)) {
      message = `Has Ganado ${state.jugadorUno.nombre} - ${jugadorUno} le gana a ${jugadorDos}`;
    } else if (hayEmpate(jugadorUno, jugadorDos)) {
      message = `Has empatado, ${jugadorUno} empata contra ${jugadorDos}`;
    } else {
      message = `Has perdido ${state.jugadorUno.nombre} - ${jugadorUno} pierde contra ${jugadorDos}`;
    }

    return message;
  };

  const value = {
    state,
    puntosGanadosJugadorUno: state.jugadorUno.ganados,
    puntosPerdidosJugadorUno: state.jugadorUno.perdidos,
    puntosGanadosJugadorDos: state.jugadorDos.ganados,
    empatados: state.empates,
    jugadorMaquina: state.maquina.jugadaActual,
    jugadaActualJugadorUno: state.jugadorUno.jugadaActual,
    jugadaActualJugadorDos: state.jugadorDos.jugadaActual,
    jugadorUno: state.jugadorUno,
    jugadorDos: state.jugadorDos,
    ganadorEntreJugadorUnoYJugadorDos,
    realizoJugadaJugadorUno,
    realizoJugadaJugadorDos,
    dispatch,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
