/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './Header'
import '../styles/main.scss'

import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IntroOverlay from './core/IntroOverlay'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      craft {
        entries(section: "homepage") {
          title
          id
        }
      }
    }
  `)

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
// set state for viewport height and width
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  //  create refs so gsap can access the dom nodes
  const introOverlayLeftSectionEl = useRef(null)
  const introOverlayRightSectionEl = useRef(null)

  useEffect(() => {
    // makes 100vh work properly on modern mobile browsers. Fallsback to 100vh on older browsers
    const vh = dimensions.height * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    // updates the calculated viewport height on resize. Is passed through the debounce function to so it will only run once per second to improve performance
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 1000)
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  })

  useEffect(() => {
    // console.log(
    //   'intro overlay ref ==',
    //   introOverlayTopSectionEl.current.children
    // )
    // used to make the hero  100vh work properly on mobile devices.

    const tl = gsap.timeline({
      defaults: { duration: 1,  ease: 'expo.inOut', },
    })
.to(introOverlayTopSectionEl.current.children, 1, {
      scaleY: 0,
      stagger: 0.3,
      transformOrigin: 'bottom left',
    }).to(introOverlayRightSectionEl,  {
      scaleX: 0,
      transformOrigin: 'bottom left',
    })
    // tl.to(
    //   introOverlayBottomSectionEl.current.children,
    //   1.3,
    //   {
    //     width: 0,
    //     ease: 'expo.inOut',
    //     stagger: 0.3,
    //   },
    //   '-=0.3'
    // )

    // return () => removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <IntroOverlay
        topSection={introOverlayTopSectionEl}
        bottomSection={introOverlayBottomSectionEl}
      />
      <div className="min-h-screen flex flex-col justify-between">
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <Header />

        <main className="o-main-content">{children}</main>
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
