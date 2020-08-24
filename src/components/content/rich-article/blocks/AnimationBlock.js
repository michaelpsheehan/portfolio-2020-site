import React, { useRef, useEffect } from 'react'

import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LottieAnimation from '../../LottieAnimation'
import Text from '../../../core/Text'
import Section from '../../../core/Section'
import {useGlobalDispatchContext} from '../../../../context/globalContext'
import slideInOnScroll from './slideInOnScroll'
gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

const AnimationBlock = ({ block, sectionColor, classes = '' }) => {
  const dispatch = useGlobalDispatchContext()

  const animationEl = useRef(null)
  const textEl = useRef(null)
  const animationBlockEl = useRef(null)
  const hamburgerHeight = 50

 let backgroundColor = null

  block.backgroundColour && block.backgroundColour !== 'default'
  ?  backgroundColor = `js-dark-background text-white ${block.backgroundColour} `
  : null

const setUiDark = () => {
  dispatch(
    {type: 'CHANGE_UI_STYLE',
    newUiStyle: 'ui-style-dark-on-white',
  })
}

const setUiLight = () => {
  dispatch(
    {type: 'CHANGE_UI_STYLE',
    newUiStyle: 'ui-style-white-on-dark',
  })
}



  const onScrollDown = (el) => {
    if(el.progress > 0.95 ) {
      const remainingScroll =  el.end - el.scroller.scrollY 
      if( remainingScroll  < hamburgerHeight &&  remainingScroll > 0 ) {
        if(el.trigger.classList.contains('js-dark-bg')) {
         el.direction === 1 ? setUiLight() :  setUiDark()
        } else {
         el.direction === 1 ?  setUiDark() : setUiLight()
          
        }
      }
    }
  }




  useEffect(() => {
const tl = slideInOnScroll(animationBlockEl.current, animationEl.current,  textEl.current, onScrollDown, dispatch)
      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: animationBlockEl.current,
      //     scrub: 1,
      //     start: 'top bottom',
      //     end: 'top top',
      //     markers: {startColor: "black", endColor: "black", fontSize: "20px"},
      //     onUpdate: (el) => onScrollDown(el)
    
      //   },
      // })
      // tl.from(
      //   animationEl.current,
      //   0.1,
      //   {
      //     x: '17vw',
      //     y:'25vh',
      //     transformOrigin: '50% 50%',
      //     ease: 'Power3.out',
      //   }
      // )
      // tl.from(
      //   [...textEl.current.children].reverse(),
      //   0.1,
      //   {
      //     x: '-20vw',
      //     transformOrigin: '50% 50%',
      //     ease: 'Power3.out',
      //     stagger: {
      //       amount: 0.03,
      //     },
      //   },
      //   0
      //   )
      // tl.from(
      //   [...textEl.current.children].reverse(),
      //   0.1,
      //   {
      //     y:'-20vh',
      //     ease: 'Power1.out',
      //   },
      //   '<'
      //   )
      //   tl.from(
      //     [...textEl.current.children].reverse(),
      //     0.1,
      //     {
      //     opacity: 0,
      //       ease: 'Power1.out',
      //     },
      //         '<'
      //     )

  return () => {
    tl.kill()
    tl.scrollTrigger.kill()
  }
   

  },[])

  return (
    <Section
      classes={`md:my-0 overflow-hidden ${backgroundColor !== null ? backgroundColor : ''}  `}
   
      content={
        <div
          className={`c-animation-block py-16 md:py-0 md:flex md:items-center md:h-screen  ${
            block.alignAnimation === 'Left' ? 'md:flex-row-reverse' : ''
          } 
          ${backgroundColor !== null ? 'js-dark-bg' : 'js-white-bg'} 
          `
        }
          ref={animationBlockEl}
        >
          {(block.heading || block.body) && (
            <div className="mb-8 md:mb-0 md:w-1/2 ">
              <div className="c-animation-block__text" >
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
