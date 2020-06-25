import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import projectsIndexData from '../hooks/projectsIndexData'
import SEO from '../components/Seo'

const baseUrl = 'http://157.245.46.3'

const ProjectsIndexPage = () => {
  const { projects, entry } = projectsIndexData()

  console.log('Projects query results =', projects)
  console.log('Entry query results =', entry)
  return (
    <Layout>
      <SEO title={entry.title ? entry.title : ''} />
      <div className="c-projects-index pt-64">
        <div className="container border">
          <div className="">
            {entry && <h2>{entry.title}</h2>}
            <div />
          </div>
          <h2>Projects</h2>
          <div className="c-grid">
            {projects &&
              projects.map((project) => (
                <div key={project.id}>
                  <Link to={`/projects/${project.slug}`}>
                    <div className="border">
                      <div className="text-center">
                        <div className="block">{project.slug}</div>
                        <div className="block">{project.title}</div>
                        <div className="block">{project.introBody}</div>
                        <div className="block"> uri{project.uri}</div>
                        <div className="block">url{project.url}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProjectsIndexPage
