import React from 'react'

const Text = ({ heading, body, forwardedRef, classes = '' }) => {
  return (
    <div className={`c-text ${classes}`} ref={forwardedRef}>
      <h2 className="c-text__heading">{heading}</h2>
      <div className="c-text__body">{body}</div>
    </div>
  )
}
export default Text
