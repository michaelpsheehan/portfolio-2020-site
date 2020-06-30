import React from 'react'

const HeroImage = ({ siteUrl, image }) => (
  <img
    className="c-hero-image"
    src={`${siteUrl}${image.optimisedImagesHero.src}`}
    // srcSet={`${siteUrl}${image.optimisedImagesHero.srcset}`}
  />
)

export default HeroImage
