import React from 'react'

const HeroImage = ({ siteUrl, image }) => {
  const imageComponent = image ? (
    <img
      className="c-hero-image"
      src={`${siteUrl}${image.optimizedImagesFullWidth.src}`}
      srcSet={`${siteUrl}/${image.optimizedImagesFullWidth.srcset}`}
      alt={image.id}
    />
  ) : (
    <></>
  )
  return imageComponent
}
export default HeroImage
