// import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import PrimaryNav from './PrimaryNav'
import SiteHeadBurger from './SiteHeadBurger'
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
  ActionTypes
} from '../../context/globalContext'

interface Props {
  classes?: string;
  isHomepage?: boolean;
}

const SiteHead = ({ classes = '', isHomepage }: Props) => {

  const dispatch = useGlobalDispatchContext()
  const { overlayStatus, currentUiStyle } = useGlobalStateContext()

  const handleKeydown = (e: KeyboardEvent ) => {
  
    const isEscapeEvent = e.key === 'Escape' || e.key === 'Esc' 
   
    if (isEscapeEvent && overlayStatus === 'open') {
      dispatch({type: ActionTypes.CLOSE_OVERLAY})
    }
  }

  const toggleOverlay = () => {
    overlayStatus === 'open' ?
      dispatch({type: ActionTypes.CLOSE_OVERLAY})
      : dispatch({type: ActionTypes.OPEN_OVERLAY})
    }

  useEffect(() => {
   
    window.addEventListener('keydown',  handleKeydown)

    return ()=> {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [overlayStatus])


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
