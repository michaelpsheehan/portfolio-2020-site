import React from 'react'
import Button from '../../core/Button'

const Hero = ({ heroMediaContent, heroContent }) => {
  const { primaryButton, secondaryButton, heroTextBody } = heroContent

  return (
    <div className="c-hero">
      <div className="c-hero__media-content">{heroMediaContent}</div>

      <div className="c-hero__content">
        {heroTextBody && (
          <div
            className="c-hero__text text-white"
            dangerouslySetInnerHTML={{ __html: heroTextBody }}
          />
        )}
        <div className="c-hero__buttons">
          {primaryButton.text && (
            <Button
              classes="c-button--ghost border-white text-white hover:bg-white  md:mr-8"
              text={primaryButton.text}
              url={primaryButton.url}
            />
          )}
          {secondaryButton.text && (
            <Button
              classes="bg-white text-black border-white text-brand-blue"
              text={secondaryButton.text}
              url={secondaryButton.url}
            />
          )}
        </div>
      </div>
      <div className="testing-scroll c-scroll-icon" />
    </div>
  )
}
export default Hero
