import React from 'react'
import useSiteUrl from '../../hooks/useSiteUrl'
require('lazysizes')
require('lazysizes/plugins/attrchange/ls.attrchange')

interface ImageProps {
  image: {
    placeholderImage: string
    srcset: string
  }
  classes?: string
  alt?: string
}

const Image: React.FC<ImageProps> = ({ image, alt = '', classes = '' }: ImageProps) => {
  const siteUrl: string = useSiteUrl()
  // formats the srcset from imageOptimize to work with gatsby by adding the craft backend url to the start of each src
  const formattedSrcset: string = image.srcset
    .split(',')
    .map((currentSrc: string) => `${siteUrl}${currentSrc.trim()}, `)
    .join()

  const imageComponent: JSX.Element = 
    <img
      className={`c-image shadow-2xl w-full lazyload ${classes}`}
      sizes="100vw"
      data-sizes="100vw"
      src={image.placeholderImage}
      data-srcset={formattedSrcset}
      alt={alt}
    />
  
  
  return imageComponent
}
export default Image
