import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LottieAnimation from '../components/content/LottieAnimation'
import Text from '../components/core/Text'
import Section from '../components/core/Section'
import { useGlobalDispatchContext } from '../context/globalContext'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

const hamburgerHeight = 50

const setUiDark = (dispatch) => {
  dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-dark-on-white' })
}

const setUiLight = (dispatch) => {
  dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-white-on-dark' })
}

const onScrollDown = (el, dispatch) => {
  // const dispatch = useGlobalDispatchContext()
  if (el.progress > 0.95) {
    const remainingScroll = el.end - el.scroller.scrollY
    if (remainingScroll < hamburgerHeight && remainingScroll > 0) {
      if (el.trigger.classList.contains('js-dark-bg')) {
        el.direction === 1 ? setUiLight(dispatch) : setUiDark(dispatch)
      } else if (el.trigger.classList.contains('js-white-bg')) {
        el.direction === 1 ? setUiDark(dispatch) : setUiLight(dispatch)
      }
    }
  }
  console.log('current state --', currentState)
}
const slideInOnScroll = (
  elementContainer,
  element1,
  element2,
  onScrollCallback,
  // onEnterCallback,
  // onExitCallback
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elementContainer,
      scrub: 1,
      // start: 'top bottom',
      // end: 'top top',
      markers: {startColor: "black", endColor: "black", fontSize: "20px"},
      onUpdate: (el) => onScrollCallback(el),
    //  onUpdate: (el) =>  onScrollCallback ? onScrollCallback(el) : null,
      // onLeave: (el) =>  onLeaveCallback?  onLeaveCallback(el) : null
      // onToggle: (el) =>  onLeaveCallback?  onLeaveCallback(el) : null
      // onEnter: (el) => onEnterCallback(el),
      // onLeave: (el) => onExitCallback(el),
      // onLeave (el) => onLeaveC

    
    
    },
  })
  .from(element1, 0.1, {
    x: '17vw',
    y: '25vh',
    transformOrigin: '50% 50%',
    ease: 'Power3.out',
  })
  .from(
    [...element2.children].reverse(),
    0.1,
    {
      x: '-20vw',
      transformOrigin: '50% 50%',
      ease: 'Power3.out',
      stagger: {
        amount: 0.03,
      },
    },
    0
  )
  .from(
    [...element2.children].reverse(),
    0.1,
    {
      y: '-20vh',
      ease: 'Power1.out',
    },
    '<'
  )
  .from(
    [...element2.children].reverse(),
    0.1,
    {
      opacity: 0,
      ease: 'Power1.out',
    },
    '<'
  )

  return tl
}

export default slideInOnScroll
