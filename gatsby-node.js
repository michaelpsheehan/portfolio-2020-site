const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.createPages = async ({ actions, graphql }) => {
  const GET_PAGES = `
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

  const result = await graphql(GET_PAGES)
  console.log(result)
  result.data.craft.entries.map((page) => {
    actions.createPage({
      path: `/projects/${page.slug}`,
      component: require.resolve('./src/pages/templates/page-template.js'),
      context: { id: page.id },
    })
  })
}
