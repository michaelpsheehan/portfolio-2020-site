import React from 'react'

const SiteHeadBurger = ({overlayStatus, toggleOverlay}) =>  
{
 return (<div className={`c-site-head__hamburger ${overlayStatus === 'open' ? 'c-site-head__hamburger--open' : 'c-site-head__hamburger--closed'}`}
          onClick={() => toggleOverlay()}
        >
          <span />
          <span />
          <span />
        </div>)

}
export default SiteHeadBurger
