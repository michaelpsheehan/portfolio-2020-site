// import PropTypes from 'prop-types'
import React from 'react'
import PrimaryNav from './PrimaryNav'
import SiteHeadBurger from './SiteHeadBurger'
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from '../context/globalContext'

import ThemeButton from './ThemeButton'

const SiteHead = () => {
  const dispatch = useGlobalDispatchContext()
  const { overlayStatus } = useGlobalStateContext()

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

  const isOverlayOpen = overlayStatus === 'open'
  return (
    <>
      <header className={`c-site-head fixed `}>
        <div className="c-site-head__container container">
          <div className="c-site-head__components">
            <ThemeButton />
            <SiteHeadBurger
              overlayStatus={overlayStatus}
              toggleOverlay={toggleOverlay}
            />
          </div>
          <PrimaryNav isOverlayOpen={isOverlayOpen} />
        </div>
      </header>
    </>
  )
}

export default SiteHead
