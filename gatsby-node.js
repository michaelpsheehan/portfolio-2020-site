const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.createPages = async ({ actions, graphql }) => {
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
