import React from 'react'
import Layout from '../../components/Layout'
import projectsIndexData from '../../hooks/projectsIndexData'
import SEO from '../../components/Seo'
import PageTitle from '../../components/content/PageTitle'
import Section from '../../components/core/Section'
import Grid from '../../components/core/Grid'
import EntryCard from '../../components/core/EntryCard'

const ProjectsIndexPage = () => {
  const { projects, entry, siteUrl } = projectsIndexData()

  return (
    <Layout>
      {entry && (
        <>
          <SEO title={entry.title ? entry.title : ''} />
          <Section
            content={<PageTitle title={entry.title} underline subtitle />}
            container
          />
        </>
      )}
      {projects && (
        <Section
          content={
            <Grid
              items={projects}
              itemTemplatePath={EntryCard}
              itemSection="projects"
              siteUrl={siteUrl}
            />
          }
          container
        />
      )}
    </Layout>
  )
}

export default ProjectsIndexPage
