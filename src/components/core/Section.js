import React, {useRef, useEffect, useState} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin( ScrollTrigger)
import { useGlobalDispatchContext, useGlobalStateContext } from '../../context/globalContext'

const Section = ({ content, container, classes = '' }) =>{
  let sectionRef = useRef(null)
  const dispatch = useGlobalDispatchContext()
  const globalState = useGlobalStateContext()
  const {currentUiStyle} = globalState
  console.log('CLOSURE COLOR', globalState.currentUiStyle)

  const [currentTheme, toggleTheme] = useState(currentUiStyle)
  // const toggleTheme = () => {
  //   const globalState = useGlobalStateContext()

  // }

  const setUiDark = () => {
    console.log('set ui dark')
    dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-dark-on-white' })
    // toggleTheme('ui-style-dark-on-white')
  }
  
  const setUiLight = () => {
    console.log('set ui light')
    dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-white-on-dark' })
    // toggleTheme('ui-style-white-on-dark')
  }
  let toggleSiteHeadUiColor = null
  
useEffect(()=> {

  //  toggleSiteHeadUiColor = (el) => {
  //   console.log(el.trigger, el.progress)
  //   console.log('current ui style --', currentUiStyle)
  //     currentUiStyle === 'ui-style-white-on-dark' ? setUiDark() : setUiLight()
  // }
},[currentUiStyle])

useEffect(()=> {
        let scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70",
        // end: "bottom 70",
        // markers: {startColor: "black", endColor: "black", fontSize: "20px"},
        // onEnter: (el)=> toggleSiteHeadUiColor(el), 
        // onLeave: (el)=> toggleSiteHeadUiColor(el), 
        // onToggle: (el)=> toggleSiteHeadUiColor(el), 

      });

      return ()=> {
     scrollTrigger.kill()
      }
},[])

  return container ? (
    <section className={`c-section ${classes}`} ref={sectionRef}>
      <div className="container">{content}</div>
    </section>
  ) : (
    <section className={`c-section ${classes}`} ref={sectionRef}>{content}</section>
  )}
export default Section


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