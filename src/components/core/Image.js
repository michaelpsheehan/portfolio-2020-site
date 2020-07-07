import React from 'react'

const Image = ({ siteUrl, image, optimizedImageVariation }) => {
  const imageComponent = image ? (
    <img
      className="c-image"
      src={`${siteUrl}${image.optimisedImagesHero.src}`}
      srcSet={`${siteUrl}/${optimizedImageVariation.srcset}`}
      alt={image.id}
    />
  ) : (
    <></>
  )
  return imageComponent
}
export default Image
