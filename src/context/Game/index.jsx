import { jugadas } from 'constants';
import { winstTo } from 'constants';
import { MODO } from 'constants/enums';
import {createContext, useContext, useEffect, useReducer} from 'react'
import { gameReducer } from './gameReducer'
import { GANO_JUGADOR_UNO_VS_MAQUINA } from './types';

export const initialState = {
    modo: "",
    mensajeGanador: "",
    empates: 0,
    jugadorUno: {
        perdidos: 0,
        ganados: 0,
        nombre: '',
        jugadaActual: {},
    },
    jugadorDos: {
        ganados: 0,
        nombre: '',
        jugadaActual: {},
    },
    maquina: {
        jugadaActual: {},
    },
}

const GameContext = createContext();

export const GameProvider = ({children}) => {

    const [state, dispatch] = useReducer(gameReducer, initialState);

    const realizoJugada = Object.keys(state.jugadorUno.jugadaActual).length !== 0;
    const esJugadorUno = state.modo === MODO.JUGADOR_UNO;

    useEffect(() => {
        if(esJugadorUno && realizoJugada ) {
         const jugadorGanoJugada = jugadaLeganaALaMaquina();     
         dispatch({type: GANO_JUGADOR_UNO_VS_MAQUINA, payload: jugadorGanoJugada});   
        }
    },[state.jugadorUno.jugadaActual, state.modo]);

    const jugadaLeganaALaMaquina = () => {
      return winstTo[state.jugadorUno.jugadaActual.name]?.gana.includes(jugadas[jugadaAleatoria(jugadas.length - 1)])
    }
    
    const jugadaAleatoria = (max) => {
        return Math.floor(Math.random() * max) + 0;
    }

    const value = {
        state,
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