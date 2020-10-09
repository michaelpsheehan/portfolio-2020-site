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
          ... on Craft_projects_projects_Entry {
            id
            featuredProjects {
              id
              title
            }
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
                  description
                  title
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
          }
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
                  focalPoint
                  placeholder
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
  `)

  return {
    entry: data.craft.entry ? data.craft.entry[0] : null,
    projects: data.craft.entries,
    siteUrl: data.site.siteMetadata.siteUrl,
    globalSets: data.craft.globalSets,
  }
}

export default projectsIndexData
