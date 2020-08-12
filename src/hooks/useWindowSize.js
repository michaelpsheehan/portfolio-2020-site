import { useState, useEffect } from 'react'

// function debounce(fn, ms) {
//   let timer
//   return () => {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       timer = null
//       fn.apply(this, arguments)
//     }, ms)
//   }
// }

export default function useWindowSize() {
  console.log('get window size function ran')
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
