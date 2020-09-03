import React, { useRef, useEffect, useState } from 'react'

import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LottieAnimation from '../../LottieAnimation'
import Text from '../../../core/Text'
import Section from '../../../core/Section'
import { useGlobalDispatchContext, useGlobalStateContext } from '../../../../context/globalContext'
import slideInOnScroll from '../../../../animations/slideInOnScroll'
gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

const AnimationBlock = ({ block,  classes = '' }) => {
  const animationEl = useRef(null)
  const textEl = useRef(null)
  const animationBlockEl = useRef(null)
  const hamburgerHeight = 50
  let backgroundColor = null
  const isReversed = block.alignAnimation === 'Left' ? true : false
  const forwardedRef = useRef(null)
  const [isPaused, togglePlay] = useState(true)

// useEffect(()=> {
//   togglePlay(false)
// },[])
  // const onEnterScroll = (el) => ()=> togglePlay(false)
  // const onExitScroll = (el) => ()=> togglePlay(true)
  
  
  useEffect(() => {
      
      const tl = slideInOnScroll(
        animationBlockEl.current,
        animationEl.current,
        textEl.current,
        togglePlay
        // onEnterScroll,
        // onExitScroll
        )

        // console.log('refs are')
        // console.log('animationBlockEl --', animationBlockEl.current)
        // console.log('aanim el --', animationEl.current)
        // console.log('aanim el --', animationEl.current)
        
    return ()=> {
      tl.kill()
      tl.scrollTrigger.kill()
    }
    }, [])

    console.log('animation block rendered')
    console.log('animation block state of paused ===', isPaused)
    return (
   
    <div
      className={`c-animation-block  py-16 md:py-0 overflow-hidden`}
      ref={animationBlockEl}
    >
      <div className="container">
        <div
          className={`md:flex md:items-center md:h-screen  
    ${isReversed ? 'md:flex-row-reverse' : ''}
           `}
        >
          {(block.heading || block.body) && (
            <div className="mb-8 md:mb-0 md:w-1/2 ">
              <div
                className={`c-animation-block__text ${
                  isReversed ? 'md:flex md:flex-row-reverse' : ''
                }`}
              >
                <div className="max-w-sm  ">
                  <Text
                    heading={block.heading}
                    body={block.body}
                    classes="c-text--animation"
                    forwardedRef={textEl}
                  />
                  {block.animatorName && (
                    <div className="text-xs opacity-50 mt-4">
                      Animation by{' '}
                      <a href={block.animatorUrl} target="__blank">
                        {block.animatorName}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div
            className={`c-lottie-animation md:w-1/2  text-center 
            ${isReversed ? 'md:pr-8' : 'md:pl-8'}
            `}
          >
            <div className="c-animation-block__animation" ref={animationEl}>
              <LottieAnimation
                // heading={block.heading}
                // lottieAnimationPath={block.animationData}
                lottieAnimationData={block.animationData}
                // alignAnimation={block.alignAnimation}
                // animatorName={block.animatorName}
                // animatorLink={block.animatorUrl}
                forwardedRef={forwardedRef}
                isPaused={isPaused}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnimationBlock
