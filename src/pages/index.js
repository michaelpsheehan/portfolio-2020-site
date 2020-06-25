import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import homepageData from '../hooks/homepageData'
import SEO from '../components/Seo'

const baseUrl = 'http://157.245.46.3'

const IndexPage = () => {
  const { entry, siteUrl } = homepageData()

  return (
    <Layout>
      <SEO title={entry.title} />
      <div className=" pt-64">
        <div className="container border">
          <div className="">
            <Link to="/projects">
              <h2 className="text-4xl text-center ">Code By Sheen</h2>
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
                srcSet={`${siteUrl}${entry.heroImage[0].optimisedImagesHero.srcset}`}
              />
            </Link>
          </div>

          <h2>Grid Test</h2>
          <div className="c-grid">
            <div className="border">
              <div className="text-center">1</div>
            </div>
            <div className="border">
              <div className="text-center">2</div>
            </div>
            <div className="border">
              <div className="text-center">3</div>
            </div>
            <div className="border">
              <div className="text-center">4</div>
            </div>
            <div className="border">
              <div className="text-center">5</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
