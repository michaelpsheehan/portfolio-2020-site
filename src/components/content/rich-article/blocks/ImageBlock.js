import React from 'react'
import Section from '../../../core/Section'
import Image from '../../../core/Image'

const ImageBlock = ({ block, siteUrl, classes = '' }) => {
  const { constrainImage, image, imageCaption } = block

  if (image === null) {
    return
  }

  return (
    <Section
      content={
        <Image image={image[0].optimizedImagesFullWidth} alt={imageCaption} />
      }
      container={constrainImage}
    />
  )
}
export default ImageBlock
