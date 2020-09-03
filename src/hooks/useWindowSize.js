import { useState, useEffect } from 'react'
import debounce from '../helpers/debounce'

export default function useWindowSize() {
  // isBrowser check stops gatsby trying to run this on ssr where the window does not exist
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) {
    return
  }
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    // listen for window resizes and run the function again to update the values
    function handleResize() {
      setWindowSize(getSize())
    }
    // run through a debounce function to slow it down
    window.addEventListener('resize', debounce(handleResize))
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(()=> {
    const vh = windowSize.height * 0.01
    // update the value for the vh css custom property on resize. 
    // This ensures mobile devices have a true 100vh on mobile without the address bar making 100vh incorrect. falls back to standard 100vh if the browser does not support custom properties
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },[windowSize])
  
  return isBrowser ? windowSize : null
}
