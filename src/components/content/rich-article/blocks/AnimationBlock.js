import React, { useRef, useEffect } from 'react'

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

const AnimationBlock = ({ block, sectionColor, classes = '' }) => {
  const dispatch = useGlobalDispatchContext()
  const state = useGlobalStateContext()


  // console.log('state --', state)

  const animationEl = useRef(null)
  const textEl = useRef(null)
  const animationBlockEl = useRef(null)
  const hamburgerHeight = 50

  let backgroundColor = null
const isDarkbg = block.backgroundColour === 'default' ? false : true
  block.backgroundColour && block.backgroundColour !== 'default'
    ? (backgroundColor = `js-dark-background text-white ${block.backgroundColour} `)
    : null

  const isReversed = block.alignAnimation === 'Left' ? true : false
  // console.log('IS REVERSED --', isReversed)

  const setUiDark = () => {
    dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-dark-on-white' })
    console.log('dispatch dark')
  }
  
  const setUiLight = () => {
    dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-white-on-dark' })
    console.log('dispatch light')
  }

  // const updateUiOnScroll = (el) => {
  //   let classBeingScrolled = el.trigger.classList.contains('js-dark-bg') ? 'js-dark-bg' : 'js-white-bg'
  //   if (el.progress > 0.95) {
  //     console.log('current class being scrolled --', classBeingScrolled)
  //     const remainingScroll = el.end - el.scroller.scrollY
  //     if (remainingScroll < hamburgerHeight && remainingScroll > 0) {
  //       if (el.trigger.classList.contains('js-dark-bg')) {
  //         el.direction === 1 ? setUiLight() : setUiDark()
  //       } else {
  //         el.direction === 1 ? setUiDark() : setUiLight()
  //       }
  //     }
  //   }
  // }

  
  //  const  resetUiOnExitScroll = (el) => {
//    console.log('exit',el)
//   el.progress === 1 ? setUiLight() : null
//  }

//  const  resetUiOnExitScroll = (el) => {
//    el.direction === 1 ?  setUiLight() : setUiDark()
//   }
  
//   const onEnter = (el) => {
  //     console.log(el)
//     console.log('ENTERRRRR')
//     if (el.trigger.classList.contains('js-white-bg') ) {
//       console.log('white bg')
//       if(el.direction === 1) {
//         console.log(' going DOWN ---1')
//       } else if (el.direction === -1) {
//         console.log(' going Up ---1')
//       }
//     }

// if  (el.trigger.classList.contains('js-dark-bg')) {
//   console.log('ENTERRRRR')
//   console.log(' darkkkk')

//   if(el.direction === 1) {
  //     console.log(' going DOWN ---1')
//   } else if (el.direction === -1) {
//     console.log(' going Up ---1')
//   }
// }

// }

//   // setUiLight()
//   // setUiDark()
// const onExit = (el) => {
//   // setUiLight()
//   // setUiDark()


//   if (el.trigger.classList.contains('js-white-bg') ) {
//     console.log('EXIT')
//     console.log(' white bg')
//     if(el.direction === 1) {
//       console.log(' going DOWN ---1')
//     } else if (el.direction === -1) {
//       console.log(' going Up ---1')
//     }
//   }
  
//   if  (el.trigger.classList.contains('js-dark-bg')) {
//     console.log('EXIT')
// console.log(' darkkkk')

// if(el.direction === 1) {
//   console.log(' going DOWN ---1')
// } else if (el.direction === -1) {
//   console.log(' going Up ---1')
// }
// }
//  }

 
// let currentClass = null

  // const updateUiOnScroll = (el) => {

  //   if (el.progress > 0.95) {
  //     const remainingScroll = el.end - el.scroller.scrollY
  //     if (remainingScroll < hamburgerHeight && remainingScroll > 0) {
  //       if (el.trigger.classList.contains('js-dark-bg')) {
  //         el.direction === 1 ? setUiLight() : setUiDark()
  //       } else if (el.trigger.classList.contains('js-white-bg')) {
  //         el.direction === 1 ? setUiDark() : setUiLight()
  //       }
  //     }
  //   }


  // }


  
  const updateUiOnScroll = (el) => {
    // let currentClass = el.trigger.classList.contains('js-dark-bg') ? 'js-dark-bg' : 'js-white-bg'
   console.log('state',state)
   if(el.trigger.classList.contains('js-dark-bg')) {
console.log('DARK')
     console.log('current class =',  el.trigger.classList)
    } else if (el.trigger.classList.contains('js-white-bg')) {
      console.log('WHITE')
           console.log('current class =',  el.trigger.classList)

    }
    // if (el.progress > 0.95) {
    //   const remainingScroll = el.end - el.scroller.scrollY
    //   if (remainingScroll < hamburgerHeight && remainingScroll > 0) {
    //     if (el.trigger.classList.contains('js-dark-bg')) {
    //       el.direction === 1 ? setUiLight() : setUiDark()
    //     } else if (el.trigger.classList.contains('js-white-bg')) {
    //       el.direction === 1 ? setUiDark() : setUiLight()
    //     }
    //   }
    // }


  }

  useEffect(() => {
    // if(!isDarkbg) {
      
      const tl = slideInOnScroll(
        animationBlockEl.current,
        animationEl.current,
        textEl.current,
        // onEnter,
        // onExit
        updateUiOnScroll
    
        )
        
        // return () => {
        //   tl.kill()
        //   tl.scrollTrigger.kill()
        // }
      // }
    }, [])

  return (
    // <Section
    //   classes={`md:my-0 overflow-hidden ${backgroundColor !== null ? backgroundColor : ''}  `}

    //   content={
    <div
    className={`c-animation-block  py-16 md:py-0
          ${
            backgroundColor !== null
              ? `${backgroundColor} js-dark-bg`
              : 'js-white-bg'
          } 
          
          overflow-hidden    `}
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
      </div>
    </div>
  )
}
export default AnimationBlock
