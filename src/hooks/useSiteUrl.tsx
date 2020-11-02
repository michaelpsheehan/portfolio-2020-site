import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

interface SiteUrlQuery {
  siteUrl: string
}

const useSiteUrl = () => {
  const data: SiteUrlQuery = getSiteUrl()
  const siteUrl: string = data.siteUrl

  return siteUrl
}

export default useSiteUrl


const getSiteUrl = () => {
  const data = useStaticQuery(graphql`
    query SiteUrlQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  return {
    siteUrl: data.site.siteMetadata.siteUrl,
  }
}
