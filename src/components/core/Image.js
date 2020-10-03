import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'

const Image = ({ image, alt = '', classes = '' }) => {
  if (image === null) {
    return
  }
  
  const { siteUrl } = getSiteUrl()

  // formats the srcset from imageOptimize to work with gatsby by adding the craft backend url to the start of each src
  const formattedSrcset = image.srcset
    .split(',')
    .map((currentSrc) => `${siteUrl}${currentSrc.trim()}, `)
    .join()

  const imageComponent = (
    <img
      className={`c-image shadow-2xl w-full lazyload ${classes}`}
      sizes="100vw"
      data-sizes="100vw"
      src={image.placeholderImage}
      data-srcset={formattedSrcset}
      alt={alt}
    />
  )
  return imageComponent
}
export default Image

const getSiteUrl = () => {
  const data = useStaticQuery(graphql`
    query HeadingQuery {
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
