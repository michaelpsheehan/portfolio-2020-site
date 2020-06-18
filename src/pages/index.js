import React from 'react'
import Layout from '../components/layout'
import homepageData from '../hooks/homepageData'
import SEO from '../components/Seo'

const baseUrl = 'http://157.245.46.3'

const IndexPage = () => {
  const { entry } = homepageData()

  return (
    <Layout>
      <SEO title={entry.title} />
      <div className="c-test pt-64">
        <div className="container border">
          <div className="">
            <h2 className="text-4xl text-center ">
              Code By Sheen
            </h2>
            <div>{entry.ctaButton1Text}</div>
            <div>{entry.ctaButton1Link}</div>
            <div>{entry.ctaButton2Text}</div>
            <div>{entry.ctaButton2Link}</div>
            <div>{entry.heroImage[0].url}</div>
            <div />
            <h2>Image Optimize placeholder image --</h2>
            <img
              src={`${entry.heroImage[0].optimisedImagesHero.placeholderImage}`}
            />
            full image optimize srcset image below
            <img
              srcSet={`${baseUrl}${entry.heroImage[0].optimisedImagesHero.srcset}`}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
