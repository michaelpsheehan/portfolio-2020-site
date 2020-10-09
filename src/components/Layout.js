import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import SiteHead from './core/SiteHead'
import '../styles/main.scss'
import useWindowSize from '../hooks/useWindowSize'
import SiteFoot from './core/SiteFoot'
import { useLocation } from '@reach/router'
import TransitionCover from '../components/core/transitions/TransitionCover'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

const Layout = ({ children, uri }) => {
  const { pathname } = useLocation()
  let isHomepage = pathname === '/' ? true : false
  const siteContainerEl = useRef(null)
  let windowSize = useWindowSize()

  useEffect(() => {
    gsap.to(window, { duration: 0.1, scrollTo: 0 })
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()
    // stops body flashing from happening
    tl.set(siteContainerEl.current, { css: { visibility: 'visible' } })
  }, [isHomepage])

  return (
    <>
      <div className={`c-site-container`} ref={siteContainerEl}>
        <TransitionCover />
        <SiteHead isHomepage={isHomepage} />
        <main
          className={`o-main-content overflow-x-hidden ${
            isHomepage ? 'f-is-homepage' : ''
          }`}
        >
          {children}
        </main>
        <SiteFoot />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
