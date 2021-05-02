import React from 'react'
import { IHeroImage } from '../../../types/types'

interface IProps {
  siteUrl: string;
  image: IHeroImage
}

const HeroImage = ({ siteUrl, image }: IProps) => {
    if(!image) return
  
    return (
        <img
            className="c-hero-image"
            src={`${siteUrl}${image.optimizedImagesFullWidth.src}`}
            srcSet={`${siteUrl}/${image.optimizedImagesFullWidth.srcset}`}
            alt={image.id}
        />
    )   
}

export default HeroImage
