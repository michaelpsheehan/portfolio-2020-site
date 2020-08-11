import React from 'react'
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from '../../context/globalContext'

const Text = ({ heading, body, classes = '' }) => {
  const dispatch = useGlobalDispatchContext()
  const { currentTheme } = useGlobalStateContext()

  const toggleTheme = (themeToUpdate) => {
    console.log('the theme to update in the dispatch --- ', themeToUpdate)
    if (currentTheme === 'dark-ui-items') {
      dispatch({ type: 'CHANGE_THEME', theme: 'light-ui-items' })
    } else {
      dispatch({ type: 'CHANGE_THEME', theme: 'dark-ui-items' })
    }
  }

  return (
    <div className={`c-text ${classes}`}>
      <h2 className="c-text__heading">{heading}</h2>
      <div className="c-text__body">{body}</div>
      <div
        className="p-4 bg-black text-white"
        onClick={toggleTheme}
        // onKeyDown={toggleTheme}
      >
        func toggle
      </div>
    </div>
  )
}
export default Text
