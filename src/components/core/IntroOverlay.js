import React from 'react'

function IntroOverlay({ topSection, bottomSection }) {
  return (
    <>
      <div className="c-intro-overlay ">
        <div className="c-intro-overlay__top-section " ref={topSection}>
          <div className="c-intro-overlay__top-item" />
          <div className="c-intro-overlay__top-item" />
          <div className="c-intro-overlay__top-item" />
          {/* <div className="c-intro-overlay__top-item" />
          <div className="c-intro-overlay__top-item" />
          <div className="c-intro-overlay__top-item" /> */}
        </div>
        <div className="c-intro-overlay__bottom-section " ref={bottomSection}>
          <div className="c-intro-overlay__bottom-item" />
          <div className="c-intro-overlay__bottom-item" />
          <div className="c-intro-overlay__bottom-item" />
        </div>
      </div>
    </>
  )
}
export default IntroOverlay
