import React, { createContext, useReducer, useContext } from 'react'

// define context
export const GlobalStateContext = createContext()
export const GlobalDispatchContext = createContext()

//  reducer

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME': {
      // console.log('context current theme ===', action.theme)
      return {
        ...state,
        currentTheme: action.theme,
      }
    }
    default: {
      throw new Error(`unhandled action type: ${action.type}`)
    }
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    currentTheme: 'light-ui-items',
  })

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  )
}

// custom hooks for when we want to use our global state
export const useGlobalStateContext = () => useContext(GlobalStateContext)

export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)
