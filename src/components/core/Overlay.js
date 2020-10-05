import React from 'react'

const Overlay = (props) => {
  const { classes } = props
  console.log('overlay children are-- ', props.children)
  return (
    <div className={`c-overlay ${classes}`}>
      {props.children}  
      </div>
  )
}

export default Overlay
