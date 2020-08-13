import React, { useRef, useEffect } from 'react'

import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LottieAnimation from '../../LottieAnimation'
import Text from '../../../core/Text'
import Section from '../../../core/Section'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

const AnimationBlock = ({ block, classes = '' }) => {
  const animationEl = useRef(null)
  const textEl = useRef(null)
  const animationBlockEl = useRef(null)
  // const forwardedRef = useRef(null)

  // const defaultAnimation = () =>

  useEffect(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: animationBlockEl.current,
        scrub: 1,
        start: 'top bottom',
        end: 'top 25%',
        markers: {startColor: "black", endColor: "black", fontSize: "20px"}
 
      },
    })
    tl.from(
      animationEl.current,
      0.1,
      {
        x: '17vw',
        y:'25vh',
        // opacity: 0.6,
        transformOrigin: '50% 50%',
        ease: 'Power3.out',
      }
      // 0
    )
    tl.from(
      [...textEl.current.children].reverse(),
      0.1,
      {
        x: '-5vw',
        y:'-15vh',
        transformOrigin: '50% 50%',
        ease: 'Power3.out',
        stagger: {
          amount: 0.03,
        },
      },
      // ">-0.5"
      0
      )
  },[])

  return (
    <Section
      classes={`md:my-0 overflow-hidden  `}
      content={
        <div
          className={`c-animation-block py-16 md:py-0 md:flex md:items-center md:h-screen  ${
            block.alignAnimation === 'Left' ? 'md:flex-row-reverse' : ''
          }`}
          ref={animationBlockEl}
        >
          {(block.heading || block.body) && (
            <div className="mb-8 md:mb-0 md:w-1/2 ">
              <div className="c-animation-block__animation" >
                <div className="max-w-sm mx-auto " >
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
            className={`c-lottie-animation md:w-1/2  text-center ${
              block.alignAnimation === 'Left' ? 'md:pr-8' : 'md:pl-8'
            }`}
          >
            <div className="c-animation-block__animation" ref={animationEl}>
              <LottieAnimation
                heading={block.heading}
                lottieAnimationPath={block.animationData}
                lottieAnimationData={block.animationData}
                alignAnimation={block.alignAnimation}
                animatorName={block.animatorName}
                animatorLink={block.animatorUrl}
                // forwardedRef={forwardedRef}
              />
            </div>
          </div>
        </div>
      }
      container
    />
  )
}
export default AnimationBlock
