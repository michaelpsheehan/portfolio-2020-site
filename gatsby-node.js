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
            heroImage {
              url
              ... on Craft_images_Asset {
                optimizedImagesFullWidth {
                  ... on Craft_optimizedImagesFullWidth_OptimizedImages {
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

            richArticle {
              ... on Craft_richArticle_animation_BlockType {
                id
                typeHandle
                alignAnimation(label: true)
                animationUrl
                animatorName
                animatorUrl
                fullWidthAnimation
                body
                heading
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

  const updatedRichArticle = []
  // if lottie animation files have been used in the richArticle Matrix field fetch the animation data to use with lottie-web

  await Promise.all(
    richArticle.map(async (block) => {
      if (block.typeHandle === 'animation' && block.animationUrl) {
        const response = await axios.get(block.animationUrl)
        // console.log('axios respnse ----', response)
        // add the downloaded animation json data to the current block
        // return {
        return updatedRichArticle.push({
          ...block,
          animationData: response.data,
        })
        // ...block,
        // animationData: response.data,
        // }
      }
      // if the current block is not an animation block return the block without adding anything
      return updatedRichArticle.push(block)
    })
  )
  // wait for all the promises to resolve before continuing to make sure the json files are ready
  // await Promise.all(updatedRichArticle).catch((error) =>
  // await Promise.all(updatedRichArticle).catch((error) =>
  //   console.log('error is', error)
  // )
  // .then((finished) => {
  console.log('all promises finished --, updates')
  // await updatedRichArticle.map((el) =>
  //   console.log('updated article block --', el)
  // )
  updatedRichArticle.map((el) => console.log('updated article block --', el))

  // console.log('RESULTS == ', updatedRichArticle)

  await actions.createPage({
    path: '/home',
    component: require.resolve('./src/pages/HomeTemplate.js'),
    context: {
      siteUrl,
      entry: entry ? entry[0] : null,
      richArticle: updatedRichArticle || null,
    },
  })
  // })
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
