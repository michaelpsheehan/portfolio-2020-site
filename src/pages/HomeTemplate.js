import React, { useRef, useEffect, useState } from 'react'
import Section from '../components/core/Section'
import HeroNew from '../components/content/hero/HeroNew'
import Image from '../components/core/Image'
import RichArticle from '../components/content/rich-article/RichArticle'
import IntroOverlay from '../components/core/IntroOverlay'
import { gsap } from 'gsap'
import SEO from '../components/Seo'
import { graphql } from 'gatsby'

const tl = gsap.timeline({
  defaults: { duration: 1, ease: 'expo.inOut' },
})

const introOverlayAnimation = (
  leftSection,
  rightSection,
  completeAnimation
) => {
  tl.to(leftSection.children, 1, {
    scaleY: 0,
    stagger: 0.3,
    transformOrigin: 'bottom left',
  })
  tl.to(rightSection, {
    scaleX: 0,
    transformOrigin: 'bottom right',
    onComplete: completeAnimation,
  })
}

const HomeTemplate = ({ data, pageContext }) => {
  const { richArticle } = pageContext
  const entry = data.craft.entry[0]
  const { siteUrl } = data.site
  const { seoMeta } = entry

  const [animationComplete, setAnimationComplete] = useState(false)
  const introOverlayLeftSectionEl = useRef(null)
  const introOverlayRightSectionEl = useRef(null)

  const completeAnimation = () => {
    setAnimationComplete(true)
  }

  useEffect(() => {
    // create and start intro overlay animation timeline
    introOverlayAnimation(
      introOverlayLeftSectionEl.current,
      introOverlayRightSectionEl.current,
      completeAnimation
    )
  }, [])

  return (
    <>
      <SEO
        title={seoMeta.title || title}
        description={seoMeta.description}
        socialMeta={seoMeta.social}
      />
      {animationComplete === false ? (
        <IntroOverlay
          leftSection={introOverlayLeftSectionEl}
          rightSection={introOverlayRightSectionEl}
        />
      ) : (
        ''
      )}

      {entry && (
        <HeroNew
          classes="c-hero--dark-bg"
          heroContent={{
            heroTextBody: entry.heroTextBody,
            primaryButton: {
              text: entry.ctaButton1Text,
              url: entry.ctaButton1Link,
            },
            secondaryButton: {
              text: entry.ctaButton2Text,
              url: entry.ctaButton2Link,
            },
          }}
        />
      )}
      {richArticle && (
        <RichArticle richArticle={richArticle} isHomepage={true} />
      )}
    </>
  )
}

export const homeQuery = graphql`
  query homeTemplateQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    craft {
      entry: entries(section: "homepage") {
        title
        ... on Craft_homepage_homepage_Entry {
          heroTextBody
          ctaButton1Text
          ctaButton1Link
          ctaButton2Text
          ctaButton2Link
          seoMeta {
            title
            description
            social {
              facebook {
                title
                description
                image {
                  ... on Craft_images_Asset {
                    id
                    optimizedImagesGridThumbnail {
                      src
                    }
                  }
                }
              }
              twitter {
                title
                description
                image {
                  ... on Craft_images_Asset {
                    id
                    optimizedImagesGridThumbnail {
                      src
                    }
                  }
                }
              }
            }
          }
          heroImage {
            url
            ... on Craft_images_Asset {
              optimizedImagesFullWidth {
                ... on Craft_optimizedImagesFullWidth_OptimizedImages {
                  focalPoint
                  placeholderImage
                  src
                  srcUrls
                  srcWebp
                  srcset
                }
              }
            }
          }
        }
      }
    }
  }
`

export default HomeTemplate
