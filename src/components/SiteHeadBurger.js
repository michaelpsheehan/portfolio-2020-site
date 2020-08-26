import React from 'react'

const SiteHeadBurger = ({ overlayStatus, toggleOverlay, uiStyle }) => {
  return (
    <div
      className={`c-site-head__hamburger ${uiStyle} ${
        overlayStatus === 'open'
          ? 'c-site-head__hamburger--open f-overlay-open'
          : 'c-site-head__hamburger--closed'
      }`}
      onClick={() => toggleOverlay()}
    >
      <span />
      <span />
      <span />
    </div>
  )
}
export default SiteHeadBurger
