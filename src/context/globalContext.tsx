import React, { createContext, useReducer, useContext } from 'react'

export type OverlayTypes =  'open' | 'closed'
export type UiScheme = 'white-on-dark' | 'dark-on-white'
export type UiStyles =  `ui-style-${UiScheme}`

const defaultState: IContext = {
  overlayStatus: 'closed',
  currentUiStyle: 'ui-style-white-on-dark',
}


export enum ActionTypes {
  OPEN_OVERLAY = 'OPEN_OVERLAY',
  CLOSE_OVERLAY = 'CLOSE_OVERLAY',
  CHANGE_UI_STYLE = 'CHANGE_UI_STYLE'
}

interface IContext {
  overlayStatus: OverlayTypes;
  currentUiStyle: UiStyles;
}

type Actions =
| { type: ActionTypes.OPEN_OVERLAY}
| { type: ActionTypes.CLOSE_OVERLAY}
| { type: ActionTypes.CHANGE_UI_STYLE, newUiStyle: UiStyles }

type Dispatch = React.Dispatch<Actions>

// export const GlobalDispatchContext = createContext<React.Dispatch<Actions>>(()=> void(0))
export const GlobalDispatchContext = createContext({} as Dispatch)
export const GlobalStateContext = createContext(defaultState)

const globalReducer: React.Reducer<IContext, Actions> = (state, action) => {
  switch (action.type) {
    case ActionTypes.CLOSE_OVERLAY: {
      return {
        ...state,
        overlayStatus: 'closed',
      }
    }
    case ActionTypes.OPEN_OVERLAY: {
      return {
        ...state,
        overlayStatus: 'open',
      }
    }
    case ActionTypes.CHANGE_UI_STYLE: {
      return {
        ...state,
        currentUiStyle: action.newUiStyle,
      }
    }
   
  }
}

type Props = {children: React.ReactNode}

export const GlobalProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(globalReducer, defaultState)

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  )
}

// custom hooks for when I want to use global state or dispatch an action to update state
export const useGlobalStateContext = () => useContext(GlobalStateContext)

export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)
