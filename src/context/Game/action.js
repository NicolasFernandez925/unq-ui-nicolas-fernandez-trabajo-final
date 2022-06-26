import { MODO_JUEGO, JUGADA_SELECCIONADA, REINICIAR_JUEGO, JUGADA_MAQUINA, DESCRIPCION_VICTORIA, JUGADA_SELECCIONADA_JUGADOR_DOS, EMPATE, JUGAR_REVANCHA } from "./types"


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

export const empate = (hayEmpate) => {
    return {
        type: EMPATE,
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

export const jugarRevancha = () => {
    return {
        type: JUGAR_REVANCHA,
    }
}