import React from 'react'
import projectsIndexData from '../../hooks/projectsIndexData'
import SEO from '../../components/Seo'
import PageTitle from '../../components/content/PageTitle'
import Section from '../../components/core/Section'
import Grid from '../../components/core/Grid'
import EntryCard from '../../components/core/EntryCard'
import IndexPage from '../../components/core/IndexPage'
import mergeEntries from '../../helpers/mergeEntries'
const ProjectsIndexPage = () => {
  const { projects, entry, siteUrl } = projectsIndexData()
  const { seoMeta } = entry
  const finaleEntries = mergeEntries(entry.featuredProjects, projects)

  return (
    <>
      {entry && (
        <>
          <SEO
            title={seoMeta.title || title}
            description={seoMeta.description}
            socialMeta={seoMeta.social}
         
          />
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
              items={finaleEntries}
              itemTemplatePath={EntryCard}
              itemSection="projects"
              siteUrl={siteUrl}
            />
          }
          container
        />
      )}
      {/* 
      <IndexPage
        featuredEntries={entry.featuredProjects}
        allEntries={projects}
        itemSection="projects"
        itemTemplatePath={EntryCard}

        siteUrl={siteUrl}


      >
        <div>test child</div>
        </IndexPage> */}
    </>
  )
}

export default ProjectsIndexPage
