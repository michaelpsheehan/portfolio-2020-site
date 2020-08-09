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

  useEffect(() => {
    // console.log('animation block ===', animationBlockEl.current)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: animationBlockEl.current,
        start: 'top bottom',
        scrub: 0.5,
      },
    })
    tl.from(
      animationEl.current,
      0.5,
      {
        x: '4vw',
        // opacity: 0.6,
        transformOrigin: '50% 50%',
        ease: 'Power3.out',
      },
      0
    )
    tl.from(
      textEl.current,
      0.9,
      {
        x: '- 4vw',
        // opacity: 0.6,
        transformOrigin: '50% 50%',
        ease: 'Power3.out',
      },
      0
    )
  })

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
              <div className="c-animation-block__animation" ref={textEl}>
                <div className="max-w-sm mx-auto ">
                  <Text
                    heading={block.heading}
                    body={block.body}
                    classes="c-text--animation"
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
