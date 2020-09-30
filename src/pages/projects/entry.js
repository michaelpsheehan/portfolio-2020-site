import React, { useRef, useEffect } from 'react'
import { graphql } from 'gatsby'
import SEO from '../../components/Seo'
import Section from '../../components/core/Section'
import Image from '../../components/core/Image'
import TechnologyList from '../../components/content/technologiesList'
import formatDate from '../../components/utilities/format-date'
import PageTitle from '../../components/content/PageTitle'
import HeroImage from '../../components/content/hero/HeroImage'
import Intro from '../../components/content/Intro'
import RichArticle from '../../components/content/rich-article/RichArticle'
import staggerItemsIn from '../../animations/staggerItemsIn'

const pageTemplate = (obj) => {
  const {
    title,
    projectTypeLabel,
    projectTypeValue,
    introHeading,
    introBody,
    technologyentries,
    heroImage,
    imageCaption,
    codeRepoUrl,
    siteUrl: liveProjectUrl,
    richArticle,
    seoMeta,
  } = obj.data.craft.entries[0]
  const { siteUrl } = obj.data.site.siteMetadata
  const imageOptimizedHeroImage = heroImage
    ? heroImage[0].optimizedImagesFullWidth
    : null

  let currentProjectType

  console.log('rich article --', richArticle)

  if (projectTypeLabel === 'Portfolio') {
    currentProjectType === null
  } else if (projectTypeLabel === 'Demo Project') {
    currentProjectType = <div>{projectTypeLabel}</div>
  } else {
    currentProjectType = (
      <div>
        Developed while at{' '}
        <a className="underline" href={projectTypeValue} target="_blank">
          {projectTypeLabel}
        </a>
      </div>
    )
  }

  const projectEntryRef = useRef(null)

  useEffect(() => {
    const tl = staggerItemsIn(
      projectEntryRef.current.children,
      'Power3.out',
      0.9
    )
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <>
      <div className="overflow-hidden" ref={projectEntryRef}>
        {title && (
          <>
            {seoMeta && (
              <SEO
                title={seoMeta.title || title}
                description={seoMeta.description}
                socialMeta={seoMeta.social}
              />
            )}

            <Section
              content={
                <PageTitle title={title} subtitle={currentProjectType} />
              }
              container
            />
          </>
        )}
        <div />
        {imageOptimizedHeroImage && (
          <Section
            content={
              <Image image={imageOptimizedHeroImage} alt={imageCaption} />
            }
            container
          />
        )}
        {technologyentries && (
          <Section
            content={<TechnologyList currentList={technologyentries} />}
            container
          />
        )}
        <Section
          content={
            <Intro
              introHeading={introHeading}
              introBody={introBody}
              viewSiteLink={liveProjectUrl}
              viewCodeLink={codeRepoUrl}
            />
          }
          container
        />
        {richArticle && (
          <RichArticle richArticle={richArticle} siteUrl={siteUrl} />
        )}
      </div>
    </>
  )
}

export default pageTemplate

export const projectEntryQuery = graphql`
  query($id: [Craft_QueryArgument]) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    craft {
      entries(id: $id) {
        id
        uid
        url
        slug
        postDate
        title
        ... on Craft_project_project_Entry {
          # projectType(label: true)
          projectTypeLabel: projectType(label: true)
          projectTypeValue: projectType(label: false)
          thumbnailDescription
          introHeading
          introBody
          richText
          codeRepoUrl
          siteUrl
          imageCaption

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

          richArticle {
            ... on Craft_richArticle_video_BlockType {
            id
            typeHandle
            video {
              ... on Craft_videos_Asset {
                id
                uri
                url
              }
            }
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
                  optimizedImagesFullWidth {
                    focalPoint
                    placeholder
                    src
                    srcUrls
                    srcWebp
                    srcset
                  }
                  url
                }
              }
            }
          }

          technologyentries {
            id
            title
          }

          # heroImage(optimizedImagesFullWidth: "") {
          heroImage(optimizedImagesFullWidth: "") {
            url
            ... on Craft_images_Asset {
              id
              # optimizedImagesFullWidth {
              optimizedImagesFullWidth {
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
`
