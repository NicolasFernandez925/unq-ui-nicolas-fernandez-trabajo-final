import { MODO_JUEGO, JUGADA_SELECCIONADA, REINICIAR_JUEGO } from "./types"


export const seleccionarModo = (mode) => {
    return {
        type: MODO_JUEGO,
        payload: mode
    }
}

export const jugadaSeleccionada = (imagenJugada , nombreJugada) => {
    return {
        type: JUGADA_SELECCIONADA,
        payload: {imagenJugada, nombreJugada}
    }
}

export const reiniciarJuego = () => {
    return {
        type: REINICIAR_JUEGO,
    }
}