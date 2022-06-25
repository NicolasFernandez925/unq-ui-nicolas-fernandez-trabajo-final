import { MODO } from "constants/enums"
import { initialState } from ".";
import { MODO_JUEGO, JUGADA_SELECCIONADA, REINICIAR_JUEGO,  GANO_JUGADOR_UNO_VS_MAQUINA } from "./types"

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
                [modo]: {...state[modo], jugadaActual: { ...state.jugadaActual, image: payload.imagenJugada, name: payload.nombreJugada} }
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

            console.log(puntosGanados, puntosPerdidos)
            return {
                ...state,
                [modo]: {...state[modo], ganados: state[modo].ganados + puntosGanados, perdidos: state[modo].perdidos + puntosPerdidos} 
            }
        case REINICIAR_JUEGO:      
            return initialState;
        default:
            return state;
    }
}

