import {createContext, useContext, useReducer} from 'react'
import { gameReducer } from './gameReducer'

/*const jugada = {
    nombreJugada: 'tijera',
    imagen: 'tijer.png',
};
*/
  

export const initialState = {
    modo: "",
    mensajeGanador: "",
    empates: 0,
    jugadorUno: {
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


    const value = {
        state,
        dispatch
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