import { graphql, useStaticQuery } from 'gatsby'

const homepageData = () => {
  const data = useStaticQuery(graphql`
    query HomepageQuery {
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
            heroImage {
              url
              ... on Craft_images_Asset {
                optimizedImagesFullWidth {
                  ... on Craft_optimizedImagesFullWidth_OptimizedImages {
                    colorPalette
                    colorPaletteRgb
                    focalPoint
                    lightness
                    maxSrcsetWidth
                    optimizedImageUrls
                    optimizedWebPImageUrls
                    originalImageHeight
                    originalImageWidth
                    placeholder
                    placeholderBox
                    placeholderHeight
                    placeholderImage
                    placeholderSilhouette
                    placeholderSvg
                    placeholderWidth
                    src
                    srcUrls
                    srcWebp
                    srcset
                    srcsetWebp
                    variantHeights
                    variantSourceWidths
                  }
                }
              }
            }

            richArticle {
              ... on Craft_richArticle_animation_BlockType {
                id
                alignAnimation(label: true)
                animationUrl
                animatorName
                animatorUrl
                fullWidthAnimation
                body
                heading
              }

              ... on Craft_richArticle_text_BlockType {
                id
                typeHandle
                heading
                body
              }
              ... on Craft_richArticle_fullWidthImage_BlockType {
                id
                imageCaption
                typeHandle
                constrainImage
                image(optimizedImagesFullWidth: "") {
                  ... on Craft_images_Asset {
                    id
                    url
                    optimizedImagesFullWidth {
                      colorPalette
                      colorPaletteRgb
                      focalPoint
                      lightness
                      maxSrcsetWidth
                      optimizedImageUrls
                      optimizedWebPImageUrls
                      originalImageHeight
                      originalImageWidth
                      placeholder
                      placeholderBox
                      placeholderHeight
                      placeholderImage
                      placeholderSilhouette
                      placeholderSvg
                      placeholderWidth
                      src
                      srcUrls
                      srcWebp
                      srcset
                      srcsetWebp
                      variantHeights
                      variantSourceWidths
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return {
    entry: data.craft.entry[0],
    siteUrl: data.site.siteMetadata.siteUrl,
  }
}

export default homepageData
