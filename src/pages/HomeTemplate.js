import React, { useRef, useEffect, useState } from 'react'
import HeroNew from '../components/content/hero/HeroNew'
import RichArticle from '../components/content/rich-article/RichArticle'
import IntroOverlay from '../components/core/IntroOverlay'
import { gsap } from 'gsap'
import SEO from '../components/core/Seo'
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
  const entry = data.craft.entry[0]
  const { seoMeta } = entry
  const { richArticle } = entry
  const   allLotties  = data.allLottie.nodes

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

    richArticle?.map(article => {

        if(article.typeHandle === 'animation') {

            const matchingtLottie = allLotties.find(lottie => article.animationUrl === lottie.animationUrl)

            return article.animationData = JSON.parse(matchingtLottie.animationData ?? '') 

        } else {
            return article
        }
      
      })


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
    allLottie {
              nodes {
                id
                animationUrl
                animationData
              }
          }
    site {
      siteMetadata {
        siteUrl
      }
    }
    craft {
      entry: entries(section: "homepage") {
        title
        ... on Craft_homepage_homepage_Entry {
          
          richArticle {
              ... on Craft_richArticle_animation_BlockType {
                id
                backgroundColour
                typeHandle
                alignAnimation(label: true)
                animationUrl
                animatorName
                animatorUrl
                fullWidthAnimation
                body
                heading
              }
              ... on Craft_richArticle_webgl_BlockType {
                id
                typeHandle
                heading
                body
                backgroundColour
                alignCanvas(label: true)
                selectedScene
              }
              ... on Craft_richArticle_text_BlockType {
                id
                typeHandle
                heading
                body
                backgroundColour
              }
              ... on Craft_richArticle_fullWidthImage_BlockType {
                id
                imageCaption
                typeHandle
                constrainImage
                backgroundColour
                image(optimizedImagesFullWidth: "") {
                  ... on Craft_images_Asset {
                    id
                    url
                    optimizedImagesFullWidth {
                      focalPoint
                      lightness
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
