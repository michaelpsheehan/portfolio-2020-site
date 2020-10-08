import React, { useState, useEffect } from 'react'

const AccessibleFocusOutline = (props) => {
  //   this component helps accessibility by checking if the user navigated to the element using tab on a keyboard using the tab key and adds a class if so. This ensures the :focus outline is only removed if the user clicked with the mouse
  const [enableOutline, setOutline] = useState(false)

  useEffect(() => {
    // create listers for keydown event
    window.addEventListener('keydown', handleKeydown)

    return () => {
      // clean up on unmount
      window.removeEventListener('keydown', handleKeydown)
    }
  })

  const handleClick = () => {
    // remove outline if the user clicked with a mouse
    setOutline(false)
  }

  const handleKeydown = (e) => {
    // Detect a keyboard user from a tab key press keep outline if user is using the tab button
    const isTabEvent = e.keyCode === 9
    if (isTabEvent) {
      setOutline(true)
    }
  }

  return (
    <span
      className={`${props.classes ? props.classes : ''} ${
        enableOutline ? '-test' : 'no-outline-on-focus'
      } `}
      onClick={handleClick}
    >
      {props.children}
    </span>
  )
}

export default AccessibleFocusOutline
