import React, { useRef, useEffect } from 'react'
import Lottie from 'lottie-web'

const LottieAnimation = ({
  lottieAnimationData,
  lottieAnimationPath,
  animatorName,
  animatorLink,
  forwardedRef,
  playAnimation,

  classes = '',
}) => {
  if (lottieAnimationPath === null || lottieAnimationData === null) {
    return
  }

  const animationContainer = useRef(null)
// let currentAnimation = null
  useEffect(() => {
   let currentAnimation = Lottie.loadAnimation({
      container: animationContainer.current,
      animationData: lottieAnimationData,
      path: lottieAnimationPath,
      // autoplay: playAnimation,
      autoplay:false,
      // isPaused: playAnimation
      
    })
    console.log('current animation', currentAnimation)
    // return currentAnimation
  }, [])
  
  // useEffect(()=> {
  //   setTimeout(() => {
  //     if(playAnimation === true) {
        
  //       console.log('about to playn', currentAnimation)
  //       currentAnimation.play()
  //     }
  //   },5000);
  // },[playAnimation])

  return (
    // <div className={`c-lottie-animation text-center ${classes} `}>
    <div
      className="c-lottie-animation__svg"
      ref={animationContainer}
      // ref={forwardedRef}
    />
    // </div>
  )
}

export default LottieAnimation
