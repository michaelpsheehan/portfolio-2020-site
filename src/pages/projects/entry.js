import React, {useRef, useEffect} from 'react'
import { graphql } from 'gatsby'
import SEO from '../../components/Seo'
import Layout from '../../components/Layout'
import Section from '../../components/core/Section'
import Image from '../../components/core/Image'
import TechnologyList from '../../components/content/technologiesList'
import formatDate from '../../components/utilities/format-date'
import PageTitle from '../../components/content/PageTitle'
import HeroImage from '../../components/content/hero/HeroImage'
import Intro from '../../components/content/Intro'
import RichArticle from '../../components/content/rich-article/RichArticle'
import staggerItemsIn from '../../animations/staggerItemsIn'

const pageTemplate = ({ data }) => {
  const {
    title,
    projectType,
    introHeading,
    introBody,
    technologyentries,
    heroImage,
    imageCaption,
    codeRepoUrl,
    siteUrl: liveProjectUrl,
    richArticle,
    seoMeta
  } = data.craft.entries[0]
  const [fallbacks, socialLinks] = data.craft.globalSets
  console.log('fallbacks -----', fallbacks)
  console.log('social links -----', socialLinks)

  console.log('entry grapph ql dat ==', seoMeta)
  const { siteUrl } = data.site.siteMetadata
  const imageOptimizedHeroImage = heroImage ?  heroImage[0].optimizedImagesFullWidth : null

  const currentProjectType =
    projectType === 'Demo Project' ? (
      projectType
    ) : (
      <div>
        Developed while working at{' '}
        <a className="underline" href="https://www.google.com" target="_blank">
          {projectType}
        </a>
      </div>
    )

    const projectEntryRef = useRef(null)

    useEffect(()=> {
      const tl = staggerItemsIn(projectEntryRef.current.children, 'Power3.out', 0.9)
      return () => { 
        tl.kill()
      }
      },[])



  return (
    <>
          <div className="overflow-hidden" ref={projectEntryRef} >
      {title && (
        <>
        {seoMeta &&   <SEO title={seoMeta.title || title} description={ seoMeta.description } socialMeta={seoMeta.social} fallbackImage={fallbacks.fallbackImage} twitterHandle={socialLinks.twitterUsername}  /> }

          <Section
            content={<PageTitle title={title} subtitle={currentProjectType} />}
            container
          />
        </>
      )}
      <div />
      {imageOptimizedHeroImage && (
        <Section
          content={<Image image={imageOptimizedHeroImage} alt={imageCaption} />}
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
      {/* </Layout> */}
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
          projectType(label: true)
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




          richArticle {
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
      globalSets {
      ... on Craft_fallbacks_GlobalSet {
        id
        fallbackImage(optimizedImagesGridThumbnail: "") {
          id
          url
        }
      }
      ... on Craft_socialLinks_GlobalSet {
        id
        twitterUsername
        githubUrl
        linkedinUrl
      }
    }
    }
  }
`
