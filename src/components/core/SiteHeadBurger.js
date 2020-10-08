import React from 'react'
import AccessibleFocusOutline from '../core/AccessibleFocusOutline'
const SiteHeadBurger = ({ overlayStatus, toggleOverlay, uiStyle }) => {
  return (
    <AccessibleFocusOutline classes="flex items-center">
      <button
        id="primary-nav-toggle"
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
      </button>
    </AccessibleFocusOutline>
  )
}
export default SiteHeadBurger
