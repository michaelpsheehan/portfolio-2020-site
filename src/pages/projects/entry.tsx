import React, { useRef, useEffect } from 'react'
import { graphql } from 'gatsby'
import SEO from '../../components/core/Seo'
import Section from '../../components/core/Section'
import Image from '../../components/core/Image'
import TechnologyList from '../../components/content/technologiesList'
import PageTitle from '../../components/content/PageTitle'
import Intro from '../../components/content/Intro'
import RichArticle from '../../components/content/rich-article/RichArticle'
import staggerItemsIn from '../../animations/staggerItemsIn'
import Button from '../../components/core/Button'

import { IRichArticle, IEntryPageData } from '../../types/types'

const pageTemplate = (obj: IEntryPageData) => {
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
  
  const imageOptimizedHeroImage = heroImage
    ? heroImage[0].optimizedImagesFullWidth
    : null

  let currentProjectType

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

  const projectEntryRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(!projectEntryRef?.current) return

    const tl = staggerItemsIn(
      projectEntryRef?.current.children ,
      'Power3.out',
      0.9
    )
    return () => {
     tl? tl.kill() : null
    }
  }, [projectEntryRef])

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
                <PageTitle 
                    title={title} 
                    subtitle={currentProjectType} 
                />
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
          <RichArticle richArticle={richArticle} 
          />
        )}
      </div>
      <Section
        content={
          <div className="flex justify-center">
            <Button
              text="More Projects"
              url="/projects"
              classes="c-button--ghost"
            />
          </div>
        }
        container
      />
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
              isAmbientVideo
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
                    placeholderImage
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

          heroImage(optimizedImagesFullWidth: "") {
            url
            ... on Craft_images_Asset {
              id
              optimizedImagesFullWidth {
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
`
