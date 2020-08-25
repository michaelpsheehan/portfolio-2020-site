// import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import PrimaryNav from './PrimaryNav'
import SiteHeadBurger from './SiteHeadBurger'
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from '../context/globalContext'

import ThemeButton from './ThemeButton'

const SiteHead = ({ classes, isHomepage }) => {
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
  // let isHomepage

  // useEffect(()=> {
  //   if (typeof window === 'undefined') {
  //     return;
  //   }
  // //  isHomepage = window.location.pathname === '/' ? true : false
  //  isHomepage = window.location.pathname
  // //  console.log('location.pathname', window.location.pathname)
  // //  console.log('change si homepage to', isHomepage)

  // })

  const isOverlayOpen = overlayStatus === 'open'
  return (
    <>
      <header
        className={`c-site-head fixed ${
          isHomepage === true ? '' : 'bg-brand-blue'
        } ${classes}`}
      >
        <div className="c-site-head__container container">
          <div className="c-site-head__components">
            {/* <ThemeButton /> */}
            <SiteHeadBurger
              overlayStatus={overlayStatus}
              toggleOverlay={toggleOverlay}
              uiStyle={currentUiStyle}
            />
          </div>
          <PrimaryNav isOverlayOpen={isOverlayOpen} />
        </div>
      </header>
    </>
  )
}

export default SiteHead
