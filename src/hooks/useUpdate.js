import { useLayoutEffect, useRef } from "react"

export const useUpdate = (callback, dependents) => {
 
  const ref = useRef()

  useLayoutEffect(() => callback(ref.current), dependents)
  
  return ref

}