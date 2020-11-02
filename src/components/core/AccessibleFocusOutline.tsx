import React, { useState, useEffect } from 'react'

interface FocusProps {
  children: React.ButtonHTMLAttributes<HTMLButtonElement>
  classes?: string
}

const AccessibleFocusOutline: React.FC<FocusProps> = ({children, classes}: FocusProps) => {
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

  const handleKeydown = (e:  KeyboardEvent)  => {
    // Detect a keyboard user from a tab key press keep outline if user is using the tab button
    const isTabEvent:boolean = e.key === 'Tab'
    if (isTabEvent) {
      setOutline(true)
    }
  }

  return (
    <span
      className={`${classes ? classes : ''} ${
        enableOutline ? '' : 'no-outline-on-focus'
      } `}
      onClick={handleClick}
    >
      {children}
    </span>
  )
}

export default AccessibleFocusOutline
