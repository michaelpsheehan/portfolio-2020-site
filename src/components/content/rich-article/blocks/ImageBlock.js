import React from 'react'
import Section from '../../../core/Section'
import Image from '../../../core/Image'

const ImageBlock = ({ block, siteUrl, classes = '' }) => {
  const { constrainImage } = block
  const image = block.image[0]

  return (
    <Section
      content={
        <Image
          siteUrl={siteUrl}
          image={image}
          optimizedImageVariation={image.optimisedImagesHero}
        />
      }
      container={block.constrainImage}
    />
  )
}
export default ImageBlock
