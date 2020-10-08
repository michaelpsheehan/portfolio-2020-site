// import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import PrimaryNav from './PrimaryNav'
import SiteHeadBurger from './SiteHeadBurger'
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from '../../context/globalContext'

const SiteHead = ({ classes = '', isHomepage }) => {
  const dispatch = useGlobalDispatchContext()
  const { overlayStatus, currentUiStyle } = useGlobalStateContext()

  const toggleOverlay = () => {
    if (overlayStatus === 'open') {
      dispatch({
        type: 'CHANGE_OVERLAY',
        newStatus: 'closed',
      })
    } else {
      dispatch({
        type: 'CHANGE_OVERLAY',
        newStatus: 'open',
      })
    }
  }
  //  only allow the burger nav to change colour on scroll on the homepage. All other pages have the blue header bar with white ui items
  const burgerUiStyle = isHomepage ? currentUiStyle : 'ui-style-white-on-dark'

  // checks if the overlay is open. If it is it sets the ui icons back to white
  const isOverlayOpen = overlayStatus === 'open'

  return (
    <>
      <header
        className={`c-site-head fixed ${
          isHomepage === true ? '' : 'bg-brand-blue'
        }  ${currentUiStyle} ${classes}`}
      >
        <div className="c-site-head__container container">
          <div className="c-site-head__components">
            <SiteHeadBurger
              overlayStatus={overlayStatus}
              toggleOverlay={toggleOverlay}
              uiStyle={burgerUiStyle}
            />
          </div>
          <PrimaryNav isOverlayOpen={isOverlayOpen} />
        </div>
      </header>
    </>
  )
}

export default SiteHead
