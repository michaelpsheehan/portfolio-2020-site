import React from 'react'
import Layout from '../../components/Layout'
import projectsIndexData from '../../hooks/projectsIndexData'
import SEO from '../../components/Seo'
import PageTitle from '../../components/content/PageTitle'
import Section from '../../components/core/Section'
import Grid from '../../components/core/Grid'
import EntryCard from '../../components/core/EntryCard'
import IndexPage from '../../components/core/IndexPage'

const ProjectsIndexPage = () => {
  const { projects, entry, siteUrl } = projectsIndexData()
  return (
    <>
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

      <IndexPage
        featuredEntries={entry.featuredProjects}
        allEntries={projects}
      />
      {/* </Layout> */}
    </>
  )
}

export default ProjectsIndexPage
