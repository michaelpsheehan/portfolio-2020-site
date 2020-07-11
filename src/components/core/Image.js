import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'

const Image = ({ image, classes = '' }) => {
  if (image === null) {
    return
  }
  const { siteUrl } = getSiteUrl()
  // formats the srcset from imageOptimize to work with gatsby by adding the craft backend url to the start of each src
  const formattedSrcset = image.srcset
    .split(',')
    .map((currentSrc) => `${siteUrl}${currentSrc.trim()}, `)
    .join()

  const imageComponent = image ? (
    <img
      className={`c-image lazyload w-full  ${classes}`}
      sizes="100vw"
      src={image.placeholderImage}
      data-src={`${siteUrl}${image.src}`}
      data-srcset={formattedSrcset}
      alt={image.id}
    />
  ) : null
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
