import React from 'react'

const Overlay = (props) => {
  const { classes } = props
  return <div className={`c-overlay ${classes}`}>{props.children}</div>
}

export default Overlay
