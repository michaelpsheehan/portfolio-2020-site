import { useState, useEffect } from 'react'

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
// let prevHeight;

  useEffect(() => {
    // listen for window resizes and run the function again to update the values
    function handleResize() {
      setWindowSize(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(()=> {
    const vh = windowSize.height * 0.01
    // update the value for the vh css custom property on resize. 
    // This ensures mobile devices have a true 100vh on mobile without the address bar making 100vh incorrect. falls back to standard 100vh if the browser does not support custom properties
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },[windowSize.height])
  
  return isBrowser ? windowSize : null
}
