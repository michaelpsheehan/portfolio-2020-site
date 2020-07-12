import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  addImageToCache,
  checkImageCache,
  printImageCache,
} from '../../hooks/externalImageCache.js'
import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'
// import { addImageToCache, checkImageCache } from '../../hooks/externalImageCache'

const Image = ({ image, alt = '', classes = '' }) => {
  if (image === null) {
    return
  }
  const { siteUrl } = getSiteUrl()
  let imageSrc = image.placeholderImage

  if (checkImageCache(image.src)) {
    classes = ''
    imageSrc = `${siteUrl}${image.src}`
  } else {
    addImageToCache(image.src)
    classes += 'lazyload'
  }

  // formats the srcset from imageOptimize to work with gatsby by adding the craft backend url to the start of each src
  const formattedSrcset = image.srcset
    .split(',')
    .map((currentSrc) => `${siteUrl}${currentSrc.trim()}, `)
    .join()

  const imageComponent = (
    <img
      className={`c-image  w-full   ${classes}`}
      sizes="100vw"
      // src={image.placeholderImage}
      src={imageSrc}
      data-src={`${siteUrl}${image.src}`}
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
