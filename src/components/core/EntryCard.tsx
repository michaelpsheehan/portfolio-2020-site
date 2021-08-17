import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Button from './Button'
import Image from './Image'
import {IOptimizedImagesFullWidth , IOptimizedImagesGridThumbnail} from '../../types/types'

interface IHeroImage {
    imageOptimizeSmallImage: IOptimizedImagesFullWidth
}
interface EntryCardProps {
  item: {
    slug: string
    title: string
    thumbnailDescription?: string
    imageCaption?: string
    heroImage?: IHeroImage[] | null
  }
  itemSection?:  string
  classes?: string
}


const EntryCard = ({ item, itemSection = '', classes = '' }: EntryCardProps) => {
  const { slug, title, thumbnailDescription, imageCaption = '', heroImage } = item
  const entryCardImage = (heroImage && heroImage.length) ? heroImage[0] : null

  console.log('the entry card image ===== ', entryCardImage)

  return (
    <div className={`c-entry-card ${classes}`}>
      <AniLink
        className="bg-brand-blue"
        paintDrip
        hex="#1A68AF"
        to={`/${itemSection}/${slug}`}
      >
        {entryCardImage && (
          <Image
            image={entryCardImage.imageOptimizeSmallImage}
            alt={imageCaption}
            classes="c-entry-card__image"
          />
        )}
        {item && (
          <>
            <div className="c-entry-card__overlay">
              <div className="c-entry-card__overlay-content">
              <div>{title}</div>
                {thumbnailDescription && <div>{thumbnailDescription}</div>}
                <Button classes="c-button--ghost c-button--white" />
              </div>
            </div>
            <div className="c-entry-card__text">
              <h2 className="mb-0">{title}</h2>
            </div>
          </>
        )}
      </AniLink>
    </div>
  )
}
export default EntryCard
