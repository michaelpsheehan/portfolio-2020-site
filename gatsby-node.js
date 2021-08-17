const axios = require('axios')

const lottieUrls = [
  {id: '385',animationUrl: 'https://assets8.lottiefiles.com/packages/lf20_1LhsaB.json'},
  {id: '383', animationUrl: 'https://assets6.lottiefiles.com/datafiles/fab7172a9302d416bcdb8ac7e1c71123/data.json'},
  {id: '376', animationUrl: 'https://assets8.lottiefiles.com/packages/lf20_8hddy41z.json'},
  {id: '382', animationUrl: 'https://assets6.lottiefiles.com/private_files/lf30_BX96aR.json'},
  {id: '377', animationUrl: 'https://assets2.lottiefiles.com/packages/lf20_MAiPvC.json'},
  {id: '375', animationUrl: 'https://assets2.lottiefiles.com/private_files/lf30_2u9Zt5.json'}
]


exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
} ) => {

//   get the lottie animation data at build time and add as graphql nodes, This wouldn't work for a client site as it's not fully CMS driven but works for me. I'll eventually update this portfolio to just use mdx as it's just my site so I don't really need a CMS or a server for this  :)
await Promise.all(
  await lottieUrls.map(async (lottie, i) => {
    const lottieJsonResponse = await axios.get(lottie.animationUrl)
    
    // stringify the JSON to make querying with GraphQL a little easier
    const stringifiedLottie = JSON.stringify(lottieJsonResponse.data)

      actions.createNode({
        id: createNodeId(`lottie-${lottie.id}`),
        ...lottie,
        animationData: stringifiedLottie,
        parent: null,
        children: [],
        internal: {
          mediaType: 'application/json',
          type: 'Lottie',
          contentDigest: createContentDigest(lottie),
        },
      });
    })
)}


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
 

  await actions.createPage({
    path: '/',
    component: require.resolve('./src/pages/HomeTemplate.js'),
  })
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
        component: require.resolve('./src/pages/projects/entry.tsx'),
        context: { id: page.id },
      })
    })
  }
}
