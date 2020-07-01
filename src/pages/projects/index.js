import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import projectsIndexData from '../../hooks/projectsIndexData'
import SEO from '../../components/Seo'
import PageTitle from '../../components/content/PageTitle'
import Section from '../../components/core/Section'
import Grid from '../../components/core/Grid'
import EntryCard from '../../components/core/EntryCard'
import TestCard from '../../components/core/TestCard'

const ProjectsIndexPage = () => {
  const { projects, entry, siteUrl } = projectsIndexData()
  const testGrid = [
    { id: '123', title: 'fake title' },
    { id: '87225', title: 'title 2' },
  ]

  return (
    <Layout>
      {entry && <SEO title={entry.title ? entry.title : ''} />}
      {entry && (
        <Section content={<PageTitle title={entry.title} />} container />
      )}
      <div className="c-projects-index">
        <div className="container">
          {projects && (
            <Grid
              items={projects}
              itemTemplatePath={EntryCard}
              itemSection="projects"
            />
          )}
          {testGrid && (
            <Grid
              items={testGrid}
              itemTemplatePath={TestCard}
              itemSection="projects"
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ProjectsIndexPage
