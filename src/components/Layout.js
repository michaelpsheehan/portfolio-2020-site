/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import SiteHead from './SiteHead'
import '../styles/main.scss'

import TransitionCover from '../components/core/transitions/TransitionCover'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Theme from './core/Theme'
import useWindowSize from '../hooks/useWindowSize'
// context
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from '../context/globalContext'
import IntroOverlay from './core/IntroOverlay'

const Layout = ({ children, path }) => {
  const dispatch = useGlobalDispatchContext()

  const { currentTheme, currentUiStyle } = useGlobalStateContext()

  let isHomepage;
  console.log('is homepage on layout --', isHomepage)
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     craft {
  //       entries(section: "homepage") {
  //         title
  //         id
  //       }
  //     }
  //   }
  // `)

  const siteContainerEl = useRef(null)
  function debounce(fn, ms) {
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    }
  }


  const windowSize = useWindowSize()
  useEffect(()=> {
    isHomepage = path === '/' ? true : false
    console.log('is hoepage in useeffect is', isHomepage)

    const vh = windowSize.height * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    console.log('window size is ', windowSize)
  })
  

  useEffect(() => {
    const tl = gsap.timeline()
    // stops body flashing from happening
    tl.set(siteContainerEl.current, { css: { visibility: 'visible' } })

    dispatch({ type: 'CHANGE_UI_STYLE', newUiStyle: 'ui-style-white-on-dark' })

    // const currentWindowSize = useWindowSize()
    // console.log('current window size in use effect is --', currentWindowSize)
    // // makes 100vh work properly on modern mobile browsers. Fallsback to 100vh on older browsers
    // const vh = dimensions.height * 0.01
    // document.documentElement.style.setProperty('--vh', `${vh}px`)
    // // updates the calculated viewport height on resize. Is passed through the debounce function to so it will only run once per second to improve performance
    // const debouncedHandleResize = debounce(function handleResize() {
    //   setDimensions({
    //     height: window.innerHeight,
    //     width: window.innerWidth,
    //   })
    // }, 1000)
    // window.addEventListener('resize', debouncedHandleResize)
    // return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [])


  return (
    <>
      <div
        className={`c-site-container ${currentUiStyle} ${
          currentTheme === 'dark-ui-items' ? 'bg-black text-white' : ''
        }`}
        ref={siteContainerEl}
      >
        <TransitionCover />
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <SiteHead isHomepage={isHomepage} />
        <main className={`o-main-content ${isHomepage ? 'f-is-homepage' : ''}`} >{children}</main>

        <footer className="mt-16 py-16 bg-brand-blue">
          <div className="container text-white uppercase">Projects</div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
