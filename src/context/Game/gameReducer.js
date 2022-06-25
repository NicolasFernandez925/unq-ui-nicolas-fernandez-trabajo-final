import { MODO } from "constants/enums"
import { initialState } from ".";
import { MODO_JUEGO, JUGADA_SELECCIONADA, REINICIAR_JUEGO,  GANO_JUGADOR_UNO_VS_MAQUINA, EMPATE_VS_MAQUINA, JUGADA_MAQUINA, DESCRIPCION_VICTORIA } from "./types"

export const gameReducer = (state, {type, payload}) => {
    const modo = state.modo === MODO.JUGADOR_UNO ? "jugadorUno" : "jugadorDos"; 
    switch (type) {
        case MODO_JUEGO:
            return {
                ...state,
                modo: payload
            }
        case JUGADA_SELECCIONADA:
            return {
                ...state,
                [modo]: {...state[modo], jugadaActual: { ...state.jugadorUno.jugadaActual, image: payload.imagenJugada, name: payload.nombreJugada} }
            }
        case GANO_JUGADOR_UNO_VS_MAQUINA:  
            let puntosGanados = 0;
            let puntosPerdidos = 0;

            if(payload) {
                puntosGanados = 1
            }
            else{
                puntosPerdidos = 1;
            }

            return {
                ...state,
                [modo]: {...state[modo], ganados: state[modo].ganados + puntosGanados, perdidos: state[modo].perdidos + puntosPerdidos} 
            }
        case EMPATE_VS_MAQUINA:
            let puntosEmpate = 0;
            if(payload){
                puntosEmpate = 1;
            }
            return {
                ...state,
                empates: state.empates + puntosEmpate
            }
        case JUGADA_MAQUINA:
                return {
                    ...state,
                    maquina: {jugadaActual: {...state.maquina.jugadaActual, image: payload.imagenJugada, name: payload.nombreJugada} }
                }
        case DESCRIPCION_VICTORIA:
                return {
                        ...state,
                        descripcionVictoria: payload
                }
        case REINICIAR_JUEGO:      
            return initialState;
        default:
            return state;
    }
}

