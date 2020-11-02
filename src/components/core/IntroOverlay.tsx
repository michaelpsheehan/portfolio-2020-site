import React from 'react'

interface IntroOverlayProps {
  leftSection: React.MutableRefObject<any>
  rightSection: React.MutableRefObject<any>
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ leftSection, rightSection }) => {
  return (
    <>
      <div className="c-intro-overlay ">
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


