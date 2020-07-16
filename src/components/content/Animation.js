import React, { useEffect } from 'react'
import Lottie from 'lottie-web'
// import animation from '../../images/lottie-animations/programmer.json'

const LottieAnimation = ({
  lottieFile,
  reverse,
  alignAnimation,
  lottieAnimationData,
  lottieAnimationPath,
  classes = '',
  heading,
}) => {
  if (lottieAnimationPath === null) {
    return
  }
  console.log('align animation ==', alignAnimation)
  console.log('lottie file -- =', lottieFile)
  console.log('lottie PATH -- =', lottieAnimationPath)
  const animationContainer = React.createRef()
  // useEffect(() => {
  //   const animationObject = fetch(lottieAnimationPath)
  //     .then((response) => response.json())
  //     .then((resultData) => {
  //       console.log('fetch result data ==', resultData)
  //       const anim = Lottie.loadAnimation({
  //         container: animationContainer.current,
  //         animationData: resultData,
  //         path: lottieAnimationPath,
  //       })
  //     }, [])
  // })
  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: animationContainer.current,
      animationData: lottieAnimationData,
      path: lottieAnimationPath,
    })
  }, [])

  return (
    <div className="container">
      <div
        className={`md:flex items-center h-screen ${
          alignAnimation === 'Left' ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div className="md:w-1/2  ">
          <div className="max-w-sm mx-auto">
            <h2 className="uppercase text-4xl font-sans ">{heading} </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <div className="c-lottie-animation md:w-1/2">
          <div className="c-lottie-animation__svg" ref={animationContainer} />
          {/* {animationMarkup} */}
          <div className="c-lottie-animation__animator-name" />
        </div>
      </div>
    </div>
  )
}

export default LottieAnimation
