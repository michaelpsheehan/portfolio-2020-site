import React from 'react'
import { Link } from 'gatsby'

const EntryCard = ({ item, siteUrl, itemSection = '', classes = '' }) => {
  const { slug, title, introBody, uri, url } = item
  const heroImage = item.heroImage[0]
    ? item.heroImage[0].imageOptimizeSmallImage
    : null
  console.log('hero image ===', heroImage)

  return (
    <div className={`c-entry-card ${classes}`}>
      <Link to={`/${itemSection}/${slug}`}>
        {heroImage && (
          <img
            className="c-entry-card__image"
            srcSet={`${siteUrl}/${heroImage.srcset}`}
            alt={heroImage.id}
          />
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
