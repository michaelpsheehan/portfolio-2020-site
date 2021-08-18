import React, { useRef, useEffect, useState } from 'react'
import Lottie from 'lottie-react-web'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

interface IProps {
  lottieAnimationData: any,
  startPaused?: boolean;
  shouldLoop?: boolean ;
  classes?: string;
}

const LottieAnimation = ({
  lottieAnimationData,
  startPaused = true,
  shouldLoop = true,
  classes = '',
}: IProps) => {
  if (lottieAnimationData === null) {
    return null
  }
  const [isPaused, setPause] = useState(true)
  const lottieAnimationRef = useRef(null)

  useEffect(() => {
    if(!lottieAnimationRef?.current) return

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
      tlScroll?.kill()
      tlScroll?.scrollTrigger?.kill()
    }
  }, [])

  return (
    <div className={`c-lottie-animation ${classes}`} ref={lottieAnimationRef}>
        <Lottie
          style={{cursor: 'auto'}}
          options={{
            animationData: lottieAnimationData,
            loop: shouldLoop,
          }}
          isPaused={isPaused}
        />
    </div>
  )
}

export default LottieAnimation
