import React from 'react'
import { Link } from 'gatsby'
import Button from './Button'

const EntryCard = ({ item, siteUrl, itemSection = '', classes = '' }) => {
  const { slug, title, thumbnailDescription, introBody, uri, url } = item
  const heroImage = item.heroImage[0]
    ? item.heroImage[0].imageOptimizeSmallImage
    : null
  console.log('hero image ===', heroImage)

  return (
    <div className={`c-entry-card ${classes}`}>
      <Link to={`/${itemSection}/${slug}`}>
        {heroImage && (
          <img
            className="c-entry-card__image "
            srcSet={`${siteUrl}/${heroImage.srcset}`}
            alt={heroImage.id}
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
            <h2 className="py-8 px-4">{title}</h2>
          </>
        )}
        {/* <h2>{item && title}</h2> */}
        {/* <div className="block">{slug}</div>
        <div className="block">{introBody}</div>
        <div className="block"> uri{uri}</div>
        <div className="block">url{url}</div> */}
      </Link>
    </div>
  )
}
export default EntryCard
