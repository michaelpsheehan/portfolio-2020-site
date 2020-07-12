import React from 'react'
import { Link } from 'gatsby'
import Button from './Button'
import Image from './Image'

const EntryCard = ({ item, siteUrl, itemSection = '', classes = '' }) => {
  const {
    slug,
    title,
    thumbnailDescription,
    imageCaption,
    introBody,
    uri,
    url,
  } = item
  const entryCardImage = item.heroImage[0]
    ? item.heroImage[0].imageOptimizeSmallImage
    : null

  return (
    <div className={`c-entry-card ${classes}`}>
      <Link to={`/${itemSection}/${slug}`}>
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
              <h2 className="">{title}</h2>
            </div>
          </>
        )}
      </Link>
    </div>
  )
}
export default EntryCard
