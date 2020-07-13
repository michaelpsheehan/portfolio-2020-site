import React from 'react'
import Section from '../../../core/Section'
import Image from '../../../core/Image'

const ImageBlock = ({ block, classes = '' }) => {
  const { constrainImage, image, imageCaption } = block
  console.log('IMAGE BLOCK ---', image[0])
  if (image === null || !image[0]) {
    return null
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
