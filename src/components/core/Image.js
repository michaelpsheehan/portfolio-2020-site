import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  addImageToCache,
  checkImageCache,
} from '../../hooks/externalImageCache.js'
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

  // checks a custom cache object to see if a

  const imageHasLoaded = checkImageCache(`${siteUrl}${image.src}`)
  // (
  // checks if an image has been loaded before using a custom cache object.The lazyloaded blur-up image is only loaded the first time that exact image variation has been loaded
  // const imageComponent = imageHasLoaded ? (
  //   <img
  //     className={`c-image lazyload w-full ${classes}`}
  //     sizes="100vw"
  //     src={`${siteUrl}${image.src}`}
  //     data-src={`${siteUrl}${image.src}`}
  //     data-srcset={formattedSrcset}
  //     alt={alt}
  //   />
  // ) :
  const imageComponent = (
    <img
      className={`c-image w-full lazyload ${classes}`}
      sizes="100vw"
      src={image.placeholderImage}
      data-src={`${siteUrl}${image.src}`}
      data-srcset={formattedSrcset}
      alt={alt}
    />
  )
  // )

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
