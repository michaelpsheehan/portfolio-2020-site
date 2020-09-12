import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import SiteHead from './SiteHead'
import '../styles/main.scss'
import TransitionCover from '../components/core/transitions/TransitionCover'
import { gsap } from 'gsap'
import useWindowSize from '../hooks/useWindowSize'

const Layout = ({ children, uri }) => {
  let isHomepage = uri === '/' ? true : false
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

  let windowSize = useWindowSize()

  useEffect(() => {
    isHomepage = uri === '/' ? true : false
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()
    // stops body flashing from happening
    tl.set(siteContainerEl.current, { css: { visibility: 'visible' } })
  }, [isHomepage])

  console.log('layout re rendered')

  return (
    // windowSize &&
    <>
      <div className={`c-site-container`} ref={siteContainerEl}>
        <TransitionCover />
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <SiteHead isHomepage={isHomepage} />
        <main
          className={`o-main-content  ${isHomepage ? 'f-is-homepage' : ''}`}
        >
          {children}
        </main>

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
