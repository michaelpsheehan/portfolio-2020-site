import React, { useRef, useEffect, useState } from 'react'

import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LottieAnimation from '../../LottieAnimation'
import Text from '../../../core/Text'
import slideInOnScroll from '../../../../animations/slideInOnScroll'
gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

const AnimationBlock = ({ block, classes = '' }) => {
  const animationEl = useRef(null)
  const textEl = useRef(null)
  const animationBlockEl = useRef(null)
  const isReversed = block.alignAnimation === 'Left' ? true : false

  useEffect(() => {
    const tl = slideInOnScroll(
      animationBlockEl.current,
      animationEl.current,
      textEl.current
    )

    return () => {
      tl.kill()
      tl.scrollTrigger.kill()
    }
  }, [])

  return (
    <div className="container h-full">
      <div className={`c-animation-block`} ref={animationBlockEl}>
        <div
          className={`c-animation-block__content ${
            isReversed ? 'md:flex-row-reverse' : ''
          }`}
        >
          {(block.heading || block.body) && (
            <div
              className={`c-animation-block__section ${
                isReversed ? 'md:flex md:flex-row-reverse' : ''
              }`}
            >
              <div
                className={`c-animation-block__text-container ${
                  isReversed ? 'md:flex md:flex-row-reverse' : ''
                }`}
              >
                <div className="c-animation-block__text">
                  <Text
                    heading={block.heading}
                    body={block.body}
                    classes="c-text--animation"
                    forwardedRef={textEl}
                  />
                  {block.animatorName && (
                    <div className="c-animation-block__attribution">
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
          <div className="c-animation-block__section">
            <div className={`c-animation-block__animation`} ref={animationEl}>
              <LottieAnimation lottieAnimationData={block.animationData} />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
export default AnimationBlock
