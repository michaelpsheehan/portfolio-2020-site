import React from 'react'

const Text = ({ heading, body, classes = '' }) => (
  <div className={`c-text ${classes}`}>
    <h1 className="c-text__Heading">{heading}</h1>
    <div className="c-text__body">{body}</div>
  </div>
)
export default Text
