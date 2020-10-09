import React, { createContext, useReducer, useContext } from 'react'

// define context
export const GlobalStateContext = createContext()
export const GlobalDispatchContext = createContext()

//  reducer
const globalReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_OVERLAY': {
      return {
        ...state,
        overlayStatus: action.newStatus,
      }
    }
    case 'CHANGE_UI_STYLE': {
      return {
        ...state,
        currentUiStyle: action.newUiStyle,
      }
    }
    default: {
      throw new Error(`unhandled action type: ${action.type}`)
    }
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    overlayStatus: 'closed',
    currentUiStyle: 'ui-style-white-on-dark',
  })

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  )
}

// custom hooks for when we want to use global state or dispatch an action to update state
export const useGlobalStateContext = () => useContext(GlobalStateContext)

export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)
