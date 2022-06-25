import { jugadas } from 'constants';
import { listItemsImages } from 'constants';
import { winstTo } from 'constants';
import { MODO } from 'constants/enums';
import {createContext, useContext, useEffect, useReducer, useRef} from 'react'
import { descripcionVictoria, empateVsMaquina, jugadaSeleccionadaMaquina } from './action';
import { gameReducer } from './gameReducer'
import { GANO_JUGADOR_UNO_VS_MAQUINA } from './types';

export const initialState = {
    modo: "",
    descripcionVictoria: "",
    empates: 0,
    jugadorUno: {
        perdidos: 0,
        ganados: 0,
        nombre: 'Jugador 1',
        jugadaActual: {},
    },
    jugadorDos: {
        ganados: 0,
        nombre: 'Jugador 2',
        jugadaActual: {},
    },
    maquina: {
        jugadaActual: {},
        nombre: "Maquina"
    },
}

const GameContext = createContext();

export const GameProvider = ({children}) => {

    const [state, dispatch] = useReducer(gameReducer, initialState);
    const jugadaActualMaquina = useRef();

    const realizoJugadaJugadorUno = Object.keys(state.jugadorUno.jugadaActual).length !== 0;
    const realizoJugadaJugadorDos = Object.keys(state.jugadorDos.jugadaActual).length !== 0;

    const modoJugadorUno = state.modo === MODO.JUGADOR_UNO;
    const modoJugadorDos = state.modo === MODO.JUGADOR_DOS;

    const jugadaAleatoria = (max) => {
        return Math.floor(Math.random() * max) + 0;
    }

    useEffect(() => {
        if(modoJugadorUno && realizoJugadaJugadorUno ) {
         const jugadaMaquina = listItemsImages[jugadaAleatoria(jugadas.length - 1)];
         jugadaActualMaquina.current = jugadaMaquina;
         dispatch(jugadaSeleccionadaMaquina(jugadaMaquina.image, jugadaMaquina.name))   
         const jugadorGanoJugada = jugadorUnoLeGanaAOtroJugador(state.jugadorUno.jugadaActual.name, jugadaActualMaquina.current.name);   
         if(hayEmpate(state.jugadorUno.jugadaActual.name, jugadaActualMaquina.current.name)) {
            dispatch(empateVsMaquina(true));
            dispatch(descripcionVictoria(generarMensajeDescripcionPartida())) 
            return;
         }  
         dispatch({type: GANO_JUGADOR_UNO_VS_MAQUINA, payload: jugadorGanoJugada});  
         dispatch(descripcionVictoria(generarMensajeDescripcionPartida())) 
        }
    },[state.jugadorUno.jugadaActual, state.modo]);

    useEffect(() => {
        if(realizoJugadaJugadorUno && realizoJugadaJugadorDos){
           
            //ganadorEntreJugadorUnoYJugadorDos(state.jugadorUno.jugadaActual.name, state.jugadorDos.jugadaActual.name)
            
        }
    }, [realizoJugadaJugadorUno,realizoJugadaJugadorDos])

    const ganadorEntreJugadorUnoYJugadorDos = (jugador1, jugador2) => {
        if(jugadorUnoLeGanaAOtroJugador(jugador1, jugador2)){
            alert("jugador 1 le gana a jugador 2")
        }
        else if(hayEmpate(jugador1, jugador2)){
            alert("hay empate")
        }
        else{
            alert("gana jugador 2")
        }
    }

    const hayEmpate = (jugador1, jugador2) => {
        return jugador1 ===  jugador2
    }
//state.jugadorUno.jugadaActual.name
//state.jugador2.jugadaActual.name
    const jugadorUnoLeGanaAOtroJugador = (jugador1, jugador2) => {
        return winstTo[jugador1]?.gana.includes(jugador2)
    }

    const generarMensajeDescripcionPartida = () => {
      
        let message = "";
        if(jugadorUnoLeGanaAOtroJugador(state.jugadorUno.jugadaActual.name, jugadaActualMaquina.current.name)){
            message = `Has Ganado ${state.jugadorUno.jugadaActual.name} le gana a ${jugadaActualMaquina.current.name}`
        }
        else if(hayEmpate(state.jugadorUno.jugadaActual.name, jugadaActualMaquina.current.name)){
            message =`Has empatado - ${state.jugadorUno.jugadaActual.name} empata contra ${jugadaActualMaquina.current.name}`
        }
        else{
            message = `Has perdido - ${state.jugadorUno.jugadaActual.name} pierde contra ${jugadaActualMaquina.current.name}`
        }

        return message;
    }
    
    const value = {
        state,
        puntosGanadosJugadorUno: state.jugadorUno.ganados,
        puntosPerdidosJugadorUno: state.jugadorUno.perdidos,
        empatados: state.empates,
        jugadorMaquina: state.maquina.jugadaActual,
        jugadorUno: state.jugadorUno.jugadaActual,
        jugadorDos: state.jugadorDos.jugadaActual,
        ganadorEntreJugadorUnoYJugadorDos,
        realizoJugadaJugadorUno,
        realizoJugadaJugadorDos,
        dispatch,
    }

    return(
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => {
    const context = useContext(GameContext);

    if(context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}