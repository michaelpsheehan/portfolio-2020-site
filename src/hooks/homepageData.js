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
                  # ... on Craft_optimizedImagesFullWidth_OptimizedImages {
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
