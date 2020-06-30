import React from 'react'
import Button from '../core/Button'

const Hero = ({ heroMediaContent, heroContent }) => {
  const { primaryButton, secondaryButton, heroTextBody } = heroContent
  console.log(heroContent)

  return (
    <div className="c-hero">
      <div className="c-hero__media-content">{heroMediaContent}</div>
      <div className="c-hero__content">
        {heroTextBody && (
          <div
            className="font-sans text-5xl text-black mb-6 whitespace-pre-wrap text-center"
            dangerouslySetInnerHTML={{ __html: heroTextBody }}
          />
        )}
        {primaryButton.text && (
          <Button text={primaryButton.text} url={primaryButton.url} />
        )}
        {secondaryButton.text && (
          <Button text={secondaryButton.text} url={secondaryButton.url} />
        )}
      </div>
    </div>
  )
}
export default Hero
