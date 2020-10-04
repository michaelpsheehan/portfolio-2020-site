import React from 'react'
import Section from '../components/core/Section'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import PageTitle from '../components/content/PageTitle'
import LottieAnimation from '../components/content/LottieAnimation'
import notFoundAnimation from '../animations/lottie/404-animation'

const NotFoundPage = () => (
  <>
    <Section
      content={
        <PageTitle
          title="404 Not Found"
          subtitle={`Oops. You've just hit a route that doesn't exist`}
        />
      }
      container
    />
    <Section
      content={
        <div className="text-center max-w-3xl mx-auto">
          <LottieAnimation
            lottieAnimationData={notFoundAnimation}
            startPaused={false}
          />
          <div className="c-animation-block__attribution">
            Animation By{' '}
            <a
              href="https://lottiefiles.com/retay"
              target="_blank"
              rel="noopener noreferrer"
            >
              Retay
            </a>
          </div>
        </div>
      }
      container
    />
  </>
)

export default NotFoundPage
