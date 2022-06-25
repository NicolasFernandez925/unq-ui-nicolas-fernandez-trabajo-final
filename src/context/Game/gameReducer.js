import { MODO } from "constants/enums"
import { initialState } from ".";
import { MODO_JUEGO, JUGADA_SELECCIONADA, REINICIAR_JUEGO } from "./types"

export const gameReducer = (state, {type, payload}) => {
    switch (type) {
        case MODO_JUEGO:
            return {
                ...state,
                modo: payload
            }
        case JUGADA_SELECCIONADA:
            const modo = state.modo === MODO.JUGADOR_UNO ? "jugadorUno" : "jugadorDos";        
            return {
                ...state,
                [modo]: {...state[modo], jugadaActual: { ...state.jugadaActual, image: payload.imagenJugada, name: payload.nombreJugada} }
            }
        case REINICIAR_JUEGO:      
            return initialState;
        default:
            return state;
    }
}

