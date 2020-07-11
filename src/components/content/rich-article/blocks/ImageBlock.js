import React from 'react'
import Section from '../../../core/Section'
import Image from '../../../core/Image'

const ImageBlock = ({ block, siteUrl, classes = '' }) => {
  const { constrainImage, image } = block

  if (image === null) {
    return
  }
  // const image = image ? image[0].optimizedImagesFullWidth : null

  return (
    <Section
      content={<Image image={image[0].optimizedImagesFullWidth} />}
      container={constrainImage}
    />
  )
}
export default ImageBlock
