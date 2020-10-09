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
  let prevHeight = null

  useEffect(() => {
    // listen for window resizes and run the function again to update the values
    function handleResize() {
      setWindowSize(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isBrowser ? windowSize : null
}
