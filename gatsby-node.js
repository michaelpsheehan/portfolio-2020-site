const axios = require('axios')

const { createRemoteFileNode } = require('gatsby-source-filesystem')

const fetch = require(`node-fetch`)

async function createHomepage({ graphql, actions }) {
  const { errors, data } = await graphql(`
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
            heroImage {
              url
              ... on Craft_images_Asset {
                optimizedImagesFullWidth {
                  ... on Craft_optimizedImagesFullWidth_OptimizedImages {
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
            richArticle {
              ... on Craft_richArticle_animation_BlockType {
                id
                backgroundColour
                typeHandle
                alignAnimation(label: true)
                animationUrl
                animatorName
                animatorUrl
                fullWidthAnimation
                body
                heading
              }
              ... on Craft_richArticle_webgl_BlockType {
                id
                typeHandle
                heading
                body
                backgroundColour
                alignCanvas(label: true)
                selectedScene
              }
              ... on Craft_richArticle_text_BlockType {
                id
                typeHandle
                heading
                body
                backgroundColour
              }
              ... on Craft_richArticle_fullWidthImage_BlockType {
                id
                imageCaption
                typeHandle
                constrainImage
                backgroundColour
                image(optimizedImagesFullWidth: "") {
                  ... on Craft_images_Asset {
                    id
                    url
                    optimizedImagesFullWidth {
                      focalPoint
                      lightness
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

      }
    }
  `)

  if (errors) {
    throw new Error('there was an error')
  }

  const { siteUrl } = data.site.siteMetadata
  const { entry } = data.craft
  const richArticle = entry ? data.craft.entry[0].richArticle : null

  if (richArticle) {
    const updatedRichArticle = await Promise.all(
      richArticle.map(async (block) => {
        if (block.typeHandle === 'animation' && block.animationUrl) {
          const response = await axios.get(block.animationUrl)
          return {
            ...block,
            animationData: response.data,
          }
        }
        return block
      })
    ).then((result) => result)

    await actions.createPage({
      // path: '/home',
      path: '/',
      component: require.resolve('./src/pages/HomeTemplate.js'),
      // component: require.resolve('./src/pages/index.js'),
      context: {
        siteUrl,
        entry: entry ? entry[0] : null,
        richArticle: updatedRichArticle || null,
        // currentPath: path
      },
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  await createHomepage({ graphql, actions })

  const GET_PROJECT_PAGES = `
    query projectsIndexQueryTest {
      craft {
        entries(section: "project") {
          ... on Craft_project_project_Entry {
            id
            slug
          }
        }
      }
    }
  `

  const result = await graphql(GET_PROJECT_PAGES)
  if (result.data.craft.entries) {
    result.data.craft.entries.map((page) => {
      actions.createPage({
        path: `/projects/${page.slug}`,
        component: require.resolve('./src/pages/projects/entry.js'),
        context: { id: page.id },
      })
    })
  }
}
