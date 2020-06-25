/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './Header'
import '../styles/main.scss'

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

  return (
    <>
      <div>
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <Header />

        <main>{children}</main>
        <footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
