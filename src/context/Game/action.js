import { MODO_JUEGO, JUGADA_SELECCIONADA, REINICIAR_JUEGO, EMPATE_VS_MAQUINA, JUGADA_MAQUINA, DESCRIPCION_VICTORIA, JUGADA_SELECCIONADA_JUGADOR_DOS } from "./types"


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

export const jugadaSeleccionadaJugadorDos = (imagenJugada , nombreJugada) => {
    return {
        type: JUGADA_SELECCIONADA_JUGADOR_DOS,
        payload: {imagenJugada , nombreJugada}
    }
}

export const empateVsMaquina = (hayEmpate) => {
    return {
        type: EMPATE_VS_MAQUINA,
        payload: hayEmpate
    }
}

export const descripcionVictoria = (message) => {
    return {
        type: DESCRIPCION_VICTORIA,
        payload: message
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