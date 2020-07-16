import React from 'react'
import { Link } from 'gatsby'
import Section from '../components/core/Section'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Hero from '../components/content/hero/hero'
import Image from '../components/core/Image'
import LottieAnimation from '../components/content/LottieAnimation'

import RichArticle from '../components/content/rich-article/RichArticle'

const HomeTemplate = (data) => {
  const { entry, siteUrl, richArticle } = data.pageContext

  return (
    <Layout>
      <>
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
              entry.heroImage && (
                <Image
                  image={entry.heroImage[0].optimizedImagesFullWidth}
                  classes="c-hero-image "
                />
              )
            }
          />
        )}

        {/* {richArticle &&
          richArticle.map((block) =>
            block.typeHandle === 'animation' ? (
              <div key={block.id}>
                <LottieAnimation
                  heading={block.heading}
                  lottieAnimationPath={block.animationUrl}
                  lottieAnimationData={block.animationData}
                  alignAnimation={block.alignAnimation}
                  artistName="Andrea Balbo"
                  artistLink="https://lottiefiles.com/andre94"
                />
              </div>
            ) : null
          )} */}

        {richArticle && <RichArticle richArticle={richArticle} />}
      </>
    </Layout>
  )
}

export default HomeTemplate
