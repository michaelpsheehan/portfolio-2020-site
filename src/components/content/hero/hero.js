import React from 'react'
import Button from '../../core/Button'

const Hero = ({ heroMediaContent, heroContent }) => {
  const { primaryButton, secondaryButton, heroTextBody } = heroContent
  console.log(heroContent)

  return (
    <div className="c-hero">
      <div className="c-hero__media-content">{heroMediaContent}</div>
      <div className="c-hero__content container md:-mt-8">
        {heroTextBody && (
          <div
            className="c-hero__text"
            dangerouslySetInnerHTML={{ __html: heroTextBody }}
          />
        )}
        <div className="c-hero__buttons">
          {primaryButton.text && (
            <Button
              classes="c-button--ghost  md:mr-8"
              text={primaryButton.text}
              url={primaryButton.url}
            />
          )}
          {secondaryButton.text && (
            <Button text={secondaryButton.text} url={secondaryButton.url} />
          )}
        </div>
      </div>
    </div>
  )
}
export default Hero
