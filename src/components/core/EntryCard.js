import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import TransitionLink from 'gatsby-plugin-transition-link'
import Button from './Button'
import Image from './Image'

import PageTransition from './PageTransition'

import FadeLink from './transitions/FadeLink'

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

  const interestingExitAnimation = (item1, item2) => (
    // console.log('intersting animation --', item1, item2)
    <PageTransition />
  )

  return (
    <div className={`c-entry-card ${classes}`}>
      <AniLink
        // duration="0.3"
        className="bg-brand-blue"
        // cover
        paintDrip
        // direction="left"
        exit="cover"
        // hex="#5891C4"
        hex="#1A68AF"
        to={`/${itemSection}/${slug}`}
      >
        {/* <TransitionLink
        to={`/${itemSection}/${slug}`}
        exit={{
          trigger: ({ exit, node }) => {
            // console.log('exit transitio started', exit, node)
            interestingExitAnimation(exit, node)
          },
          length: 1,
        }}
        entry={{
          delay: 2.6,
        }}
      > */}

        {/* <FadeLink to={`/${itemSection}/${slug}`}> */}
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
        {/* </Link> */}
        {/* </TransitionLink> */}
      </AniLink>
      {/* </FadeLink> */}
    </div>
  )
}
export default EntryCard
