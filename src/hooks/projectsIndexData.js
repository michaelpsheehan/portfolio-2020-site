import { graphql, useStaticQuery } from 'gatsby'

const projectsIndexData = () => {
  const data = useStaticQuery(graphql`
    query projectsIndexQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
      craft {
        assets {
          url
          ... on Craft_images_Asset {
            id
            url
          }
          filename
        }

        entry: entries(id: 4) {
          title
        }
        entries(section: "project") {
          ... on Craft_project_project_Entry {
            id
            slug
            title
            thumbnailDescription
            introBody
            url
            uri
            postDate
            sectionHandle
            imageCaption
            heroImage {
              # id
              ... on Craft_images_Asset {
                id
                filename
                url

                imageOptimizeSmallImage {
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
  `)

  return {
    entry: data.craft.entry ? data.craft.entry[0] : null,
    projects: data.craft.entries,
    siteUrl: data.site.siteMetadata.siteUrl,
  }
}

export default projectsIndexData
