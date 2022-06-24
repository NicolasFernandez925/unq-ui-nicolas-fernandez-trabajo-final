import {createContext, useContext, useReducer} from 'react'

const initialState = {
    empates: 0,
    jugadorOne: {
        ganados: 0,
        nombre: '',
        imageProfile: '',
        jugadaActual: {},
    },
    jugadorTwo: {
        ganados: 0,
        nombre: '',
        imageProfile: '',
        jugadaActual: {},
    },
    maquina: {
        jugadaActual: {},
    },
}

const GameContext = createContext()

export const GameProvider = ({children}) => {

    const [state, dispatch] = useReducer(initialState)


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
    const context = useContext(GameContext)

    if(context === undefined) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context;
}