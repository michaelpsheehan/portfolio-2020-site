import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const PageTransition = () => {
  const transitionLeftSectionEl = useRef(null)
  const transitionRightSectionEl = useRef(null)
  useEffect(() => {
    const tl = gsap
      .timeline({
        defaults: { duration: 5, ease: 'expo.inOut' },
      })
      .to(transitionLeftSectionEl.current.children, 1, {
        scaleY: 0.5,
        stagger: 0.3,
        transformOrigin: 'bottom left',
      })
      .to(transitionRightSectionEl.current, {
        scaleX: 0.5,
        transformOrigin: 'bottom right',
      })
  })

  return (
    <div className="c-page-transition ">
      <div
        className="c-page-transition__left-section flex"
        ref={transitionLeftSectionEl}
      >
        <div className="c-page-transition__left-item" />
        <div className="c-page-transition__left-item" />
        <div className="c-page-transition__left-item" />
      </div>
      <div
        className="c-page-transition__right-section "
        ref={transitionRightSectionEl}
      >
        {' '}
        <div className="c-page-transition__right-item" />
      </div>
    </div>
  )
}
export default PageTransition
