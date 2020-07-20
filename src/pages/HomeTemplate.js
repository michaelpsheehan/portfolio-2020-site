import React from 'react'
import { Link } from 'gatsby'
import Section from '../components/core/Section'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Hero from '../components/content/hero/hero'
import HeroNew from '../components/content/hero/HeroNew'
import Image from '../components/core/Image'
import RichArticle from '../components/content/rich-article/RichArticle'

const HomeTemplate = (data) => {
  const { entry, siteUrl, richArticle } = data.pageContext

  return (
    <Layout>
      <>
        {entry && <SEO title={entry.title} />}
        {entry && (
          <HeroNew
            classes="c-hero--dark-bg c-hero--animated-bg"
            heroContent={{
              heroTextBody: entry.heroTextBody,
              primaryButton: {
                text: entry.ctaButton1Text,
                url: entry.ctaButton1Link,
              },
              secondaryButton: {
                text: entry.ctaButton2Text,
                url: entry.ctaButton2Link,
              },
            }}
          />
        )}
        {richArticle && <RichArticle richArticle={richArticle} />}
      </>
    </Layout>
  )
}

export default HomeTemplate
