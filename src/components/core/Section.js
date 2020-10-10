import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from '../../context/globalContext'

const Section = ({ content, container, isHomepage, classes = '' }) => {
  let sectionRef = useRef(null)
  const dispatch = useGlobalDispatchContext()

  const setUiDark = () => {
    dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-dark-on-white' })
  }

  const setUiLight = () => {
    dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-white-on-dark' })
  }

  const handleScroll = (el) => {
    if (el.trigger.classList.contains('js-dark-bg')) {
      setUiLight()
    } else {
      setUiDark()
    }
  }

  const handleScrollBackToStart = (scrollTrigger) => {
    const scrollPosition = scrollTrigger.scroller.scrollY
    const windowHeight = scrollTrigger.scroller.innerHeight

    if (scrollPosition <= windowHeight) {
      setUiLight()
    }
  }

  useEffect(() => {
    setUiLight()
  }, [])

  useEffect(() => {
    let scroller = null
    if (isHomepage) {
      scroller = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70',
        onEnter: (el) => handleScroll(el),
        onEnterBack: (el) => handleScroll(el),
        onLeaveBack: (el) => handleScrollBackToStart(el),
      })
    }
    if (isHomepage && scroller) {
      return () => {
        scroller.kill()
      }
    }
  }, [isHomepage])

  return container ? (
    <section className={`c-section ${classes}`} ref={sectionRef}>
      <div className="container">{content}</div>
    </section>
  ) : (
    <section className={`c-section ${classes}`} ref={sectionRef}>
      {content}
    </section>
  )
}
export default Section
