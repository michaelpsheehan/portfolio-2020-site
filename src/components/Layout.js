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

  useEffect(() => {
    // console.log(
    //   'intro overlay ref ==',
    //   introOverlayTopSectionEl.current.children
    // )
    // used to make the hero  100vh work properly on mobile devices.
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [])

  return (
    <>
      <IntroOverlay topSection={introOverlayTopSectionEl} />
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
