import React from 'react'
import { Link } from 'gatsby'
import Section from '../components/core/Section'
import Layout from '../components/Layout'
import homepageData from '../hooks/homepageData'
import SEO from '../components/Seo'
import Hero from '../components/content/hero/hero'
import HeroImage from '../components/content/hero/HeroImage'
import Image from '../components/core/Image'

import LottieAnimation from '../components/content/Animation'

import animation5 from '../animations/at-the-office.json'

const IndexPage = () => {
  const { entry, siteUrl, animationFile } = homepageData()
  console.log('entry dat ===', entry)
  console.log('animation file ==', animationFile)
  // const animationFileLink = siteUrl + animationFile.url
  const animationFileLink =
    'https://assets2.lottiefiles.com/private_files/lf30_2u9Zt5.json'
  const animationFileSvg = <svg src={animationFileLink} />

  console.log('animation link --', animationFileLink)
  console.log('animation SVG --', animationFileSvg)

  // const animationObject = fetch(animationFileLink)
  //   .then((response) => {
  //     console.log('fetch first response ==', response)

  //     return response.json()
  //   })
  //   .then((resultData) => {
  //     console.log('fetch result data ==', resultData)
  //   })

  // console.log('animationObject =', animationObject)
  // Client-side Runtime Data Fetching
  // const [starsCount, setStarsCount] = useState(0)
  // useEffect(() => {
  //   // get data from GitHub api
  //   fetch(`https://api.github.com/repos/gatsbyjs/gatsby`)
  //     .then((response) => response.json()) // parse JSON from request
  //     .then((resultData) => {
  //       setStarsCount(resultData.stargazers_count)
  //     }) // set data for the number of stars
  // }, [])

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
              <Image
                image={entry.heroImage[0].optimizedImagesFullWidth}
                siteUrl={siteUrl}
                classes="c-hero-image "
              />
            }
          />
        )}

        <LottieAnimation
          lottieAnimationPath="https://assets2.lottiefiles.com/private_files/lf30_2u9Zt5.json"
          artistName="Andrea Balbo"
          artistLink="https://lottiefiles.com/andre94"
        />

        {/* <LottieAnimation
          lottieFile={animationFileSvg}
          lottieAnimationPath={animationFileLink}
          artistName="Andrea Balbo"
          artistLink="https://lottiefiles.com/andre94"
        /> */}
      </>
    </Layout>
  )
}

export default IndexPage
