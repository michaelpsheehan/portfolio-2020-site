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
        entry: entries(id: 4) {
          title
        }
        entries(section: "project") {
          ... on Craft_project_project_Entry {
            id
            slug
            title
            introBody
            url
            uri
            postDate
            sectionHandle
            heroImage(imageOptimizeSmallImage: "") {
              id
              ... on Craft_images_Asset {
                id
                filename
                url
                imageOptimizeSmallImage {
                  focalPoint
                  optimizedImageUrls
                  srcset(dpr: false)
                }
              }
            }
          }
        }
      }
    }
  `)

  return {
    entry: data.craft.entry[0] ? data.craft.entry[0] : null,
    projects: data.craft.entries,
    siteUrl: data.site.siteMetadata.siteUrl,
  }
}

export default projectsIndexData
