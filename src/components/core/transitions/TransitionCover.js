import React, { useRef } from 'react'
import { gsap } from 'gsap'

let transitionCoverEl = null
let transitionCoverLeftSectionEl = null
let transitionCoverRightSectionEl = null

export const transitionStandard = () => {
  if (transitionCoverLeftSectionEl) {
    let tl = gsap.timeline()
    tl.set(transitionCoverEl.current, {
      autoAlpha: 1,
    })
    tl.fromTo(
      transitionCoverLeftSectionEl.current,
      {
        duration: 2,
        x: '-100vw',
        y: 0,
        yPercent: 0,
        width: '100vw',
        height: '100vh',
      },
      { x: '-50vw', ease: 'back.out' }
    )
    tl.fromTo(
      transitionCoverRightSectionEl.current,
      {
        duration: 1,
        x: '49vw',
        y: '100vh',
        yPercent: 0,
        width: '51vw',
        height: '100vh',
      },
      {
        y: '-100vh',
        ease: 'power4.out',
      }
    )
  }
}

export const exitTransition = (nextPage) => {
  if (transitionCoverEl) {
    const tl = gsap.timeline()
    tl.to(transitionCoverEl.current.children, {
      duration: 0.5,
      yPercent: '-100',
      ease: 'power4.in',
    }).fromTo(
      nextPage,
      {
        x: '-100vw',
        duration: 0.5,
        ease: 'power1.out',
      },
      {
        x: 0,
      },

      '<'
    )
  }
}

const TransitionCover = () => {
  transitionCoverEl = useRef(null)
  transitionCoverLeftSectionEl = useRef(null)
  transitionCoverRightSectionEl = useRef(null)

  return (
    <div className="c-transition-cover" ref={transitionCoverEl}>
      <div
        className="c-transition-cover__left-section"
        ref={transitionCoverLeftSectionEl}
      ></div>
      <div
        className="c-transition-cover__right-section"
        ref={transitionCoverRightSectionEl}
      ></div>
    </div>
  )
}

export default TransitionCover
