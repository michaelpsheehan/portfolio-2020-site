import React, { useState } from 'react'
import SplitSection from '../../splitSection'
import Text from '../../../core/Text'
import WebGlBase from '../../../3d/WebGLBase'
import Button from '../../../core/Button'
import SlideInOnScroll from '../../../../animations/slideInOnScroll'

const webGLBlock = ({ block, sectionColor, classes = '' }) => {
  const [userDefinedScale, setScale] = useState(1.5)

  let backgroundColor = null
  let reversed = block.alignCanvas === 'Left' ? true : false

  block.backgroundColour && block.backgroundColour !== 'default'
    ? (backgroundColor = `js-dark-background text-white ${block.backgroundColour} `)
    : null

  const textSection = (block.heading || block.body) && (
    <div className={`max-w-sm mx-auto   ${reversed ? 'mr-0' : ''} `}>
      <Text
        heading={block.heading}
        body={block.body}
        classes="c-text--animation"

        // forwardedRef={textEl}
      />
    </div>
  )

  const webGLSection = (
    <WebGlBase sceneName={block.selectedScene} userScale={userDefinedScale} />
  )

  return (
    <div className={`c-webgl-block   ${
      backgroundColor !== null
        ? `${backgroundColor} js-dark-bg`
        : 'js-white-bg'
    } `}>
      <div
        className={`c-webgl py-16 xl:py-0 xl:flex xl:items-center xl:h-screen  relative ${
          backgroundColor !== null ? 'js-dark-bg' : 'js-white-bg'
        } `}
      >
        <div className="container">
          <div className={`${reversed ? 'xl:flex xl:flex-row-reverse' : ''} `}>
            <div className="c-webgl--primary xl:h-full mb-8 xl:mb-0 xl:w-1/2 flex  items-center  ">
              {textSection}
            </div>
          </div>
        </div>
        <div
          className={`c-webgl--secondary  xl:h-full flex items-center text-center `}
        >
          {webGLSection}
        </div>
      </div>
      <div className="container relative">
        <div className="c-scale-model">
          <div className="c-scale-model__title">zoom</div>
          <div className="c-scale-model__buttons">
            <div
              onClick={() => setScale(userDefinedScale + 0.5)}
              className="c-scale-model__button"
            >
              +
            </div>
            {userDefinedScale > 0.25 && (
              <div
                onClick={() =>
                  userDefinedScale <= 0.5
                    ? null
                    : setScale(userDefinedScale - 0.5)
                }
                className="c-scale-model__button"
              >
                -
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default webGLBlock
