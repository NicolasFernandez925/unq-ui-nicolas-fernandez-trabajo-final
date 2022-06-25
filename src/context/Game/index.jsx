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
    const jugadaActualMaquina = useRef();

    const realizoJugada = Object.keys(state.jugadorUno.jugadaActual).length !== 0;
    const esJugadorUno = state.modo === MODO.JUGADOR_UNO;

    const jugadaAleatoria = (max) => {
        return Math.floor(Math.random() * max) + 0;
    }

    useEffect(() => {
        if(esJugadorUno && realizoJugada ) {
         const jugadaMaquina = listItemsImages[jugadaAleatoria(jugadas.length - 1)];
         jugadaActualMaquina.current = jugadaMaquina;
         dispatch(jugadaSeleccionadaMaquina(jugadaMaquina.image, jugadaMaquina.name))   
         const jugadorGanoJugada = jugadaLeganaALaMaquina();   
         if(hayEmpateJugadorVsMaquina()) {
            dispatch(empateVsMaquina(true));
            dispatch(descripcionVictoria(generarMensajeDescripcionPartida())) 
            return;
         }  
         dispatch({type: GANO_JUGADOR_UNO_VS_MAQUINA, payload: jugadorGanoJugada});  
         dispatch(descripcionVictoria(generarMensajeDescripcionPartida())) 
        }
    },[state.jugadorUno.jugadaActual, state.modo]);

    const hayEmpateJugadorVsMaquina = () => {
        return state.jugadorUno.jugadaActual.name ===  jugadaActualMaquina.current.name
    }

    const jugadaLeganaALaMaquina = () => {  
      return winstTo[state.jugadorUno.jugadaActual.name]?.gana.includes(jugadaActualMaquina.current.name)
    }

    const generarMensajeDescripcionPartida = () => {
        let message = "";
        if(jugadaLeganaALaMaquina()){
            message = `${state.jugadorUno.jugadaActual.name} le gana a ${jugadaActualMaquina.current.name}`
        }
        else if(hayEmpateJugadorVsMaquina()){
            message =`${state.jugadorUno.jugadaActual.name} empata contra ${jugadaActualMaquina.current.name}`
        }
        else{
            message = `${state.jugadorUno.jugadaActual.name} pierde contra ${jugadaActualMaquina.current.name}`
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