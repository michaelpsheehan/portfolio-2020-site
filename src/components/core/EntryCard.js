import React, { useEffect } from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Button from './Button'
import Image from './Image'

const EntryCard = ({ item, itemSection = '', classes = '' }) => {
  const { slug, title, thumbnailDescription, imageCaption } = item
  const entryCardImage = item.heroImage[0]
    ? item.heroImage[0].imageOptimizeSmallImage
    : null

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
            image={entryCardImage}
            alt={imageCaption}
            classes="c-entry-card__image"
          />
        )}
        {item && (
          <>
            <div className="c-entry-card__overlay">
              <div className="c-entry-card__overlay-content">
                <div> {title}</div>
                {thumbnailDescription && <div> {thumbnailDescription}</div>}
                <Button classes="c-button--ghost c-button--white " />
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
