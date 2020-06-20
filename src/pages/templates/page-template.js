import React from 'react'
import { graphql } from 'gatsby'

export const projectEntryQuery = graphql`
  query($id: [Craft_QueryArgument]) {
    craft {
      entries(id: $id) {
        id
        uid
        url
        slug
        postDate
        title
        # richText
        ... on Craft_project_project_Entry {
          projectType(label: true)
          introHeading
          introBody
          richText

          technologyentries {
            id
            title
          }

          heroImage(optimisedImagesHero: "") {
            url
            ... on Craft_images_Asset {
              id
              optimisedImagesHero {
                focalPoint
                placeholderBox
                placeholderImage
                srcset
                srcUrls
              }
            }
          }
        }
      }
    }
  }
`

const pageTemplate = ({ data }) => {
  const { title, slug, richText } = data.craft.entries[0]
  console.log(richText)
  return (
    <>
      <div className="container">
        <h1>{title}</h1>
        <div>{slug}</div>
        <div>{richText}</div>
        <div dangerouslySetInnerHTML={{ __html: richText }} />
        <pre>{JSON.stringify(richText, null, 2)}</pre>
      </div>
    </>
  )
}

export default pageTemplate
