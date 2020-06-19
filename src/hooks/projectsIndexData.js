import { graphql, useStaticQuery } from 'gatsby'

const projectsIndexData = () => {
  const data = useStaticQuery(graphql`
    query projectsIndexQuery {
      craft {
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
    projects: data.craft.entries,
  }
}

export default projectsIndexData
