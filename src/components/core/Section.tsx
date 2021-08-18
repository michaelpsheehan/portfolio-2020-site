import React, { useRef, useEffect, useState, Children } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import {
  useGlobalDispatchContext,
  ActionTypes
} from '../../context/globalContext'

interface IProps {
  content: any;
  container?: boolean
  isHomepage?: boolean;
  classes?: string;
}

const Section = ({ content, container, isHomepage, classes = '' }: IProps) => {

  let sectionRef = useRef(null)

  const dispatch = useGlobalDispatchContext()

  const setUiDark = () => dispatch({ type: ActionTypes.CHANGE_UI_STYLE, newUiStyle: 'ui-style-dark-on-white' })
  

  const setUiLight = () =>  dispatch({ type: ActionTypes.CHANGE_UI_STYLE, newUiStyle: 'ui-style-white-on-dark' })
  

  const handleScroll = (el:  ScrollTrigger) => {
    if (el.trigger?.classList.contains('js-dark-bg')) {
      setUiLight()
    } else {
      setUiDark()
    }
  }
  let scroller: ScrollTrigger | null  = null

  const handleScrollBackToStart = (scrollTrigger: ScrollTrigger) => {
    const scroller = scrollTrigger?.scroller as Window
    const scrollPosition  = scroller?.scrollY
    const windowHeight = scroller?.innerHeight
      
      if (scrollPosition <= windowHeight) {
        setUiLight()
      }
    }

  useEffect(() => {
    setUiLight()
  }, [])



  useEffect(() => {

    if (isHomepage && sectionRef.current) {
        scroller = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70',
          onEnter: (el) => handleScroll(el),
          onEnterBack: (el) => handleScroll(el),
          onLeaveBack: (el) => handleScrollBackToStart(el),
      })
    }

    if (isHomepage && scroller !== null) {
      return () => {
       scroller?.kill() 
      }
    }
  }, [isHomepage, scroller ])

  

  return container ? (
    <section className={`c-section ${classes}`} ref={sectionRef} tabIndex={0}>
      <div className="container">{content}</div>
    </section>
  ) : (
    <section className={`c-section ${classes}`} ref={sectionRef} tabIndex={0}>
      {content}
    </section>
  )
}
export default Section
