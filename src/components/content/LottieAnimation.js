import React, { useRef, useEffect } from 'react'
// import Lottie from 'lottie-web'
import Lottie from 'lottie-react-web'


const LottieAnimation = ({
  lottieAnimationData,
  // lottieAnimationPath,
  forwardedRef,
  isPaused,

  classes = '',
}) => {
  // if (lottieAnimationPath === null || lottieAnimationData === null) {
  if ( lottieAnimationData === null) {
    return
  }

  const animationContainer = useRef(null)
  // useEffect(() => {
  //  let currentAnimation = Lottie.loadAnimation({
  //     container: animationContainer.current,
  //     animationData: lottieAnimationData,
  //     path: lottieAnimationPath,
  //     autoplay:false,
  //   })
 
  // }, [])
  

console.log('IS PAUSED ---', isPaused)
  return (
    // <div
    //   className="c-lottie-animation__svg"
    //   ref={animationContainer}
    // />
    <Lottie
     options={{
      animationData: lottieAnimationData,
    }}
    isPaused={isPaused}

    // ref={animationContainer}
    ref={forwardedRef}
    />
  )
}

export default LottieAnimation
