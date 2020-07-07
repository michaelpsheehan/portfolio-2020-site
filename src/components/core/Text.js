import React from 'react'

const Text = ({ heading, body, classes = '' }) => (
  <div className={`c-text ${classes}`}>
    <h2 className="c-text__heading">{heading}</h2>
    <div className="c-text__body">{body}</div>
  </div>
)
export default Text
