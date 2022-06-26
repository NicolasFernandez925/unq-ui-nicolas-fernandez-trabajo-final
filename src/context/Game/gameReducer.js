import { MODO } from "constants/enums";
import { initialState } from ".";
import { MODO_JUEGO, JUGADA_SELECCIONADA, REINICIAR_JUEGO,  GANO_JUGADOR_UNO_VS_MAQUINA, JUGADA_MAQUINA, DESCRIPCION_VICTORIA, JUGADA_SELECCIONADA_JUGADOR_DOS, SUMAR_PUNTOS_GANADOR_MULTIPLAYER, EMPATE, JUGAR_REVANCHA } from "./types"

export const gameReducer = (state, {type, payload}) => {
    switch (type) {
        case MODO_JUEGO:
            return {
                ...state,
                modo: payload
            }
        case JUGADA_SELECCIONADA:
            return {
                ...state,
                jugadorUno: {...state.jugadorUno, jugadaActual: { ...state.jugadorUno.jugadaActual, image: payload.imagenJugada, name: payload.nombreJugada} }
            }
        case JUGADA_SELECCIONADA_JUGADOR_DOS:
            return {
                ...state,
                jugadorDos: {...state.jugadorDos, jugadaActual: { ...state.jugadorDos.jugadaActual, image: payload.imagenJugada, name: payload.nombreJugada} }
            }
        case SUMAR_PUNTOS_GANADOR_MULTIPLAYER:
                let puntosJugadorDos = 0;
                let puntosJugadorUno = 0;
                payload.jugador === MODO.JUGADOR_UNO ? puntosJugadorUno++ : puntosJugadorDos++;
                return {
                   ...state,
                   jugadorUno: {...state.jugadorUno, ganados: state.jugadorUno.ganados + puntosJugadorUno},
                   jugadorDos: {...state.jugadorDos, ganados: state.jugadorDos.ganados + puntosJugadorDos} 
                }
        case GANO_JUGADOR_UNO_VS_MAQUINA:  
            let puntosGanados = 0;
            let puntosPerdidos = 0;
            payload ? puntosGanados++ : puntosPerdidos++;
    
            return {
                ...state,
                jugadorUno: {...state.jugadorUno, ganados: state.jugadorUno.ganados + puntosGanados, perdidos: state.jugadorUno.perdidos + puntosPerdidos} 
            }
        case EMPATE:
            let puntosEmpate = 0;
            payload && puntosEmpate++;
      
            return {
                ...state,
                empates: state.empates + puntosEmpate
            }
        case JUGAR_REVANCHA:
            return {
                ...state,
                jugadorUno: {...state.jugadorUno, jugadaActual: {} },
                jugadorDos: {...state.jugadorDos, jugadaActual: {} }
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

