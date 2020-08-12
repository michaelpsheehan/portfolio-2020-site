import React, { createContext, useReducer, useContext } from 'react'

// define context
export const GlobalStateContext = createContext()
export const GlobalDispatchContext = createContext()

//  reducer

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_THEME': {
      return {
        ...state,
        currentTheme: action.theme,
      }
    }
    case 'CHANGE_OVERLAY': {
      // console.log('context current theme ===', action.theme)
      return {
        ...state,
        overlayStatus: action.newStatus,
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
    overlayStatus: 'closed'
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
