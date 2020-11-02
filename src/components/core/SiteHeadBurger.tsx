import React from 'react'
import AccessibleFocusOutline from './AccessibleFocusOutline'

interface SiteHeadBurgerProps {
  overlayStatus?: string
  toggleOverlay: () => void
  uiStyle: string
}


const SiteHeadBurger: React.FC<SiteHeadBurgerProps> = ({ overlayStatus, toggleOverlay, uiStyle }) => {
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
