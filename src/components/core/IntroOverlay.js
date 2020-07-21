import React from 'react'

function IntroOverlay({ topSection, bottomSection }) {
  return (
    <>
      <div className="c-intro-overlay absolute flex w-screen overflow-hidden ">
        <div
          className="c-intro-overlay__left-section flex border "
          ref={leftSection}
        >
          <div className="c-intro-overlay__left-item" />
          <div className="c-intro-overlay__left-item" />
          <div className="c-intro-overlay__left-item" />
          {/* <div className="c-intro-overlay__top-item" />
          <div className="c-intro-overlay__top-item" /> */}
          {/* <div className="c-intro-overlay__top-item" />
          <div className="c-intro-overlay__top-item" />
        <div className="c-intro-overlay__top-item" /> */}
        </div>
        <div
          className="c-intro-overlay__right-section "
          ref={introOverlayRightSectionEl}
        >
          {' '}
          <div className="c-intro-overlay__right-item" />
          {/* <div className="c-intro-overlay__bottom-item" />
          <div className="c-intro-overlay__bottom-item" />
          <div className="c-intro-overlay__bottom-item" /> */}
        </div>
      </div>
    </>
  )
}
export default IntroOverlay
