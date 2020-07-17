import React from 'react'
import Section from '../../../core/Section'
import Text from '../../../core/Text'
import LottieAnimation from '../../LottieAnimation'

const AnimationBlock = ({ block, classes = '' }) => (
  <Section
    classes=" md:my-0 "
    content={
      <div
        className={`py-16 md:py-0 md:flex md:items-center md:h-screen  ${
          block.alignAnimation === 'Left' ? 'md:flex-row-reverse' : ''
        }`}
      >
        {(block.heading || block.body) && (
          <div className="mb-8 md:mb-0 md:w-1/2 ">
            <div className="max-w-sm mx-auto ">
              <Text
                heading={block.heading}
                body={block.body}
                classes="c-text--animation"
              />
              {block.animatorName && (
                <div className="text-xs opacity-50 mt-4">
                  Animation by{' '}
                  <a href={block.animatorUrl} target="__blank">
                    {block.animatorName}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={`c-lottie-animation md:w-1/2  text-center ${
            block.alignAnimation === 'Left' ? 'md:pr-8' : 'md:pl-8'
          }`}
        >
          <LottieAnimation
            heading={block.heading}
            lottieAnimationPath={block.animationData}
            lottieAnimationData={block.animationData}
            alignAnimation={block.alignAnimation}
            animatorName={block.animatorName}
            animatorLink={block.animatorUrl}
          />
        </div>
      </div>
    }
    container
  />
)
export default AnimationBlock
