import React from 'react'
import Layout from '../components/layout'
import projectsIndexData from '../hooks/projectsIndexData'
import SEO from '../components/Seo'

const baseUrl = 'http://157.245.46.3'

const ProjectsIndexPage = () => {
  const { projects } = projectsIndexData()
  console.log('Projects query results =', projects)
  return (
    <Layout>
      <SEO title={projects.title} />
      <div className="c-projects-index pt-64">
        <div className="container border">
          <div className="">
            <h2>Projects Index</h2>
            <div />
          </div>
          <h2>Projects</h2>
          <div className="c-grid">
            {projects &&
              projects.map((project) => (
                <div className="border">
                  <div className="text-center">
                    <div className="block">{project.slug}</div>
                    <div className="block">{project.title}</div>
                    <div className="block">{project.introBody}</div>
                    <div className="block"> uri{project.uri}</div>
                    <div className="block">url{project.url}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProjectsIndexPage
