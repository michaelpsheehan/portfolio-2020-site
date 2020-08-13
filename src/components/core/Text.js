import React from 'react'
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from '../../context/globalContext'

import changeTheme from '../utilities/changeTheme'

const Text = ({ heading, body, forwardedRef, classes = '' }) => {
  const dispatch = useGlobalDispatchContext()
  const { currentTheme } = useGlobalStateContext()

  return (
    <div className={`c-text ${classes}`} ref={forwardedRef}>
      <h2 className="c-text__heading">{heading}</h2>
      <div className="c-text__body">{body}</div>
      <div
        className="p-4 bg-black text-white"
        onClick={() => changeTheme(currentTheme, dispatch)}
      >
        func toggle
      </div>
    </div>
  )
}
export default Text
