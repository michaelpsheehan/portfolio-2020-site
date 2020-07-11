import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import homepageData from '../hooks/homepageData'
import SEO from '../components/Seo'
import Hero from '../components/content/hero/hero'
import HeroImage from '../components/content/hero/HeroImage'
import Image from '../components/core/Image'

const IndexPage = () => {
  const { entry, siteUrl } = homepageData()

  return (
    <Layout>
      {entry && <SEO title={entry.title} />}
      {entry && (
        <Hero
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
          heroMediaContent={
            <Image
              image={entry.heroImage[0].optimizedImagesFullWidth}
              siteUrl={siteUrl}
              classes="c-hero-image "
            />
            // <HeroImage siteUrl={siteUrl} image={entry.heroImage[0]} />
          }
        />
      )}
    </Layout>
  )
}

export default IndexPage
