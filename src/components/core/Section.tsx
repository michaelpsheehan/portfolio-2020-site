import React, { useRef, useEffect, useState, Children } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ConditionalWrapper from '../../utils/ConditionalWrapper'
import Container from '../core/Container'

gsap.registerPlugin(ScrollTrigger)

import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from '../../context/globalContext'

interface IProps {
  content: any;
  container?: boolean
  isHomepage?: boolean;
  classes?: string;
}

const Section = ({ content, container, isHomepage, classes = '' }: IProps) => {
  console.log('content == ', content)
  let sectionRef = useRef(null)
  const dispatch = useGlobalDispatchContext()

  const setUiDark = () => {
    dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-dark-on-white' })
  }

  const setUiLight = () => {
    dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-white-on-dark' })
  }

  const handleScroll = (el: globalThis.ScrollTrigger) => {
    if (el.trigger?.classList.contains('js-dark-bg')) {
      setUiLight()
    } else {
      setUiDark()
    }
  }
  let scroller: globalThis.ScrollTrigger | null  = null

  const handleScrollBackToStart = (scrollTrigger:  globalThis.ScrollTrigger) => {
   scroller = scrollTrigger.scroller
    console.log('SCROLLER ==== ', scroller)

      const scrollPosition = scroller.scrollY
      const windowHeight = scrollTrigger?.scroller?.innerHeight
      
      if (scrollPosition <= windowHeight) {
        setUiLight()
      }
    }
  // }

  useEffect(() => {
    setUiLight()
  }, [])



  useEffect(() => {

    if (isHomepage && sectionRef.current) {
        scroller = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70',
          onEnter: (el: globalThis.ScrollTrigger ) => handleScroll(el),
          onEnterBack: (el) => handleScroll(el),
          onLeaveBack: (el: globalThis.ScrollTrigger) => handleScrollBackToStart(el),
      })
    }
    if (isHomepage && scroller) {
      return () => {
       scroller?.kill() 
      }
    }
  }, [isHomepage, scroller ])

  useEffect(()=> {
    console.log('SCROLLER ==== ', scroller?.scrollY)
  })

  // const isfalse = true

  // return (
      
  //     // <section 
  //     //     className={`c-section ${classes}`} 
  //     //     ref={sectionRef}
  //     // >
  //         <ConditionalWrapper
  //             condition={true}
  //             wrapper={Container} 
  //             children={ 
  //              <div>children test</div>
  //           } 
        
            
  //         />

  //     // </section>
  // )



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
