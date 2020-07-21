/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useRef } from 'react'
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

  const introOverlayTopSectionEl = useRef(null)
  const introOverlayBottomSectionEl = useRef(null)

  useEffect(() => {
    // console.log(
    //   'intro overlay ref ==',
    //   introOverlayTopSectionEl.current.children
    // )
    // used to make the hero  100vh work properly on mobile devices.
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    const tl = gsap.timeline({
      // defaults: { duration: 1, ease: 'Power3.out' },
    })

    tl.to(introOverlayTopSectionEl.current.children, 1.5, {
      height: 0,
      ease: 'expo.inOut',
      stagger: 0.3,
    })
    tl.to(
      introOverlayBottomSectionEl.current.children,
      1.3,
      {
        width: 0,
        ease: 'expo.inOut',
        stagger: 0.3,
      },
      '-=0.3'
    )
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
