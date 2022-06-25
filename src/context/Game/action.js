import { MODO_JUEGO, JUGADA_SELECCIONADA, REINICIAR_JUEGO, EMPATE_VS_MAQUINA, JUGADA_MAQUINA } from "./types"


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

export const empateVsMaquina = (hayEmpate) => {
    return {
        type: EMPATE_VS_MAQUINA,
        payload: hayEmpate
    }
}

export const jugadaSeleccionadaMaquina = (imagenJugada, nombreJugada) => {
    return {
        type: JUGADA_MAQUINA,
        payload: {imagenJugada, nombreJugada}
    }
}

export const reiniciarJuego = () => {
    return {
        type: REINICIAR_JUEGO,
    }
}