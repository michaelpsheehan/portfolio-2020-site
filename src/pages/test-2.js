import React from 'react'
import Lottie from 'lottie-web'
import animation from '../animations/programmer'
import animation2 from '../animations/debugging.json'
import animation4 from '../animations/code-window.json'
import animation5 from '../animations/at-the-office.json'
import animation6 from '../animations/react-logo.json'
import animation7 from '../animations/ninja.json'
import Section from '../components/core/Section'
import Layout from '../components/Layout'
import LottieAnimation from '../components/content/Animation'

const Test2 = () => (
  <>
    <Layout>
      <LottieAnimation
        lottieFile={animation}
        lottieAnimationPath="../animations/programmer"
      />
      <LottieAnimation
        lottieFile={animation2}
        lottieAnimationPath="../animations/debugging"
        reverse
      />

      <LottieAnimation
        lottieFile={animation4}
        lottieAnimationPath="../animations/code-window"
        reverse
      />
      <LottieAnimation
        lottieFile={animation5}
        lottieAnimationPath="../animations/at-the-office"
        artistName="Andrea Balbo"
        artistLink="https://lottiefiles.com/andre94"
      />
      <LottieAnimation
        lottieFile={animation6}
        lottieAnimationPath="../animations/react-logo"
        reverse
      />
      <LottieAnimation
        lottieFile={animation7}
        lottieAnimationPath="../animations/ninja"
      />
      {/* <LottieAnimation
        lottieFile="https://www.michaelsheehan.dev/animations/24982-code-window.json"
        lottieAnimationPath="https://www.michaelsheehan.dev/animations/24982-code-window.json"
        reverse
      /> */}
    </Layout>
  </>
)

export default Test2
