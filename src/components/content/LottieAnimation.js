import React, { useRef, useEffect, useState } from 'react'
import Lottie from 'lottie-react-web'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const LottieAnimation = ({ lottieAnimationData, classes = '' }) => {
  if (lottieAnimationData === null) {
    return
  }
  const [isPaused, setPause] = useState(true)
  const lottieAnimationRef = useRef(null)

  useEffect(() => {
    const tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: lottieAnimationRef.current,
        onEnter: () => setPause(false),
        onLeave: () => setPause(true),
        onEnterBack: () => setPause(false),
        onLeaveBack: () => setPause(true),
      },
    })
    return () => {
      tlScroll.kill()
      tlScroll.scrollTrigger.kill()
    }
  }, [])

  return (
    <div className={`c-lottie-animation ${classes}`} ref={lottieAnimationRef}>
      <Lottie
      className='cursor-auto'
        options={{
          animationData: lottieAnimationData,
        }}
        isPaused={isPaused}
      />
    </div>
  )
}

export default LottieAnimation
