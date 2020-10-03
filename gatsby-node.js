const axios = require('axios')

const { createRemoteFileNode } = require('gatsby-source-filesystem')

const fetch = require(`node-fetch`)

async function createHomepage({ graphql, actions }) {
  const { errors, data } = await graphql(`
    query HomepageQuery {
      craft {
        entry: entries(section: "homepage") {
          ... on Craft_homepage_homepage_Entry {
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
      }
    }
  `)

  if (errors) {
    throw new Error('there was an error')
  }

  const richArticle = data.craft.entry[0].richArticle
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
    path: '/',
    component: require.resolve('./src/pages/HomeTemplate.js'),
    context: {
      richArticle: updatedRichArticle || null,
    },
  })
}
// }

exports.onCreateNode = (obj) => {
  if (obj.node.path === '/') {
    // console.log('page created ------', obj)
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
