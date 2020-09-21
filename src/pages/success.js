import React, { useState, useRef, useEffect } from 'react'
import Section from '../components/core/Section'
import PageTitle from '../components/content/PageTitle'
import LottieAnimation from '../components/content/LottieAnimation'
import successAnimation from '../animations/lottie/email-sent-by-todd-rocheford'
import Text from '../components/core/Text'
import { gsap } from 'gsap'
// import SEO from '../components/Seo'

const Success = () => {
  const successTextRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline().from(successTextRef.current, {
      delay: 1.9,
      opacity: 0,
      y: 20,
    })
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <>
      {/* <SEO title="title" description="this is the description" /> */}
      <Section
        container
        content={<PageTitle title="Success" underline subtitle />}
      />
      <Section
        content={
          <div className="text-center pb-32">
            <div ref={successTextRef}>
              <Text heading="Thank you for your message" />
              <div className="text-xs opacity-50 mt-8">
                Animation by{' '}
                <a
                  href="https://lottiefiles.com/18781-email-sent-by-todd-rocheford"
                  target="__blank"
                >
                  Todd Rocheford
                </a>
              </div>
            </div>
            <div class="max-w-sm flex justify-center mx-auto">
              <LottieAnimation
                lottieAnimationData={successAnimation}
                startPaused={false}
                shouldLoop={false}
              />
            </div>
          </div>
        }
        container
      />
    </>
  )
}

export default Success
