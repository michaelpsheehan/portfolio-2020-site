import React from 'react'

function IntroOverlay({ leftSection, rightSection }) {
  return (
    <>
      <div className="c-intro-overlay absolute flex w-screen overflow-hidden ">
        <div className="c-intro-overlay__left-section flex" ref={leftSection}>
          <div className="c-intro-overlay__left-item" />
          <div className="c-intro-overlay__left-item" />
          <div className="c-intro-overlay__left-item" />
        </div>
        <div className="c-intro-overlay__right-section " ref={rightSection}>
          {' '}
          <div className="c-intro-overlay__right-item" />
        </div>
      </div>
    </>
  )
}
export default IntroOverlay
