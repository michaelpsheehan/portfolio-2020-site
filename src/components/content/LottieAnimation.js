import React, { useRef, useEffect } from 'react'
import Lottie from 'lottie-web'

const LottieAnimation = ({
  lottieAnimationData,
  lottieAnimationPath,
  animatorName,
  animatorLink,
  forwardedRef,

  classes = '',
}) => {
  if (lottieAnimationPath === null || lottieAnimationData === null) {
    return
  }

  const animationContainer = useRef(null)

  useEffect(() => {
    Lottie.loadAnimation({
      container: animationContainer.current,
      animationData: lottieAnimationData,
      path: lottieAnimationPath,
      // autoplay: false,
    })
  }, [])

  return (
    // <div className={`c-lottie-animation text-center ${classes} `}>
    <div
      className="c-lottie-animation__svg"
      ref={animationContainer}
      // forwardedRef={forwardedRef}
    />
    // </div>
  )
}

export default LottieAnimation
