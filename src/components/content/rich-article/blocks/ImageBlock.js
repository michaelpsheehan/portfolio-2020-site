import React from 'react'
import Image from '../../../core/Image'

const ImageBlock = ({ block, classes = '' }) => {
  const { constrainImage, image, imageCaption } = block
  if (image === null || !image[0]) {
    return null
  }
 
  const imageComponent = constrainImage ? <div class="container"> <Image classes={classes} image={image[0].optimizedImagesFullWidth} alt={imageCaption} /></div> :  <Image classes={classes} image={image[0].optimizedImagesFullWidth} alt={imageCaption} />

  return (
    imageComponent
  )
}
export default ImageBlock
