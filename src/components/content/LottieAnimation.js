import React, { useEffect } from 'react'
import Lottie from 'lottie-web'

const LottieAnimation = ({
  lottieAnimationData,
  lottieAnimationPath,
  animatorName,
  animatorLink,

  classes = '',
}) => {
  if (lottieAnimationPath === null) {
    return
  }
  const animationContainer = React.createRef()

  useEffect(() => {
    Lottie.loadAnimation({
      container: animationContainer.current,
      animationData: lottieAnimationData,
      path: lottieAnimationPath,
    })
  }, [])

  return (
    <div className={`c-lottie-animation  text-center ${classes} `}>
      <div className="c-lottie-animation__svg" ref={animationContainer} />
      {/* {animatorName && (
        <div className="c-lottie-animation__animator-name">
          Animation by{' '}
          <a href={animatorLink} target="__blank">
            {animatorName}
          </a>
        </div>
      )} */}
    </div>
  )
}

export default LottieAnimation
