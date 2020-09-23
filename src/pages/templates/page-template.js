import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import TechnologyList from '../../components/content/technologiesList'
import formatDate from '../../components/utilities/format-date'

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
        ... on Craft_project_project_Entry {
          projectType(label: true)
          introHeading
          introBody
          richText

          technologyentries {
            id
            title
          }

          heroImage(optimizedImagesFullWidth: "") {
            url
            ... on Craft_images_Asset {
              id
              optimizedImagesFullWidth {
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
  const {
    title,
    slug,
    projectType,
    richText,
    introHeading,
    introBody,
    postDate,
    technologyentries,
  } = data.craft.entries[0]

  return (
    <Layout>
      {/* <SEO title={title || ''} /> */}
      <div className="container border">
        <h1>{title}</h1>
        <div>{slug}</div>
        <div>
          {projectType === 'Demo Project' ? (
            projectType
          ) : (
            <>
              While at{' '}
              <a
                className="underline"
                href="https://www.google.com"
                target="_blank"
              >
                {projectType}
              </a>
            </>
          )}
        </div>

        <div>{introHeading}</div>
        <div>{introBody}</div>
        <TechnologyList currentList={technologyentries} />

        <div>{formatDate(postDate)}</div>
        <div>{richText}</div>
        <div dangerouslySetInnerHTML={{ __html: richText }} />
      </div>
    </Layout>
  )
}

export default pageTemplate
