import React from 'react'
import Button from '../../core/Button'
import ScrollIcon from '../../core/ScrollIcon'

const Hero = ({ heroMediaContent, heroContent, classes = '' }) => {
  const { primaryButton, secondaryButton, heroTextBody } = heroContent

  return (
    <div className={`c-hero ${classes}`}>
      <div className="c-hero__media-content">{heroMediaContent}</div>

      <div className="c-hero__content">
        {heroTextBody && (
          <div
            className="c-hero__text"
            dangerouslySetInnerHTML={{ __html: heroTextBody }}
          />
        )}
        <div className="c-hero__buttons">
          {primaryButton.text && (
            <Button
              classes="c-button--ghost c-button--hero-secondary "
              text={primaryButton.text}
              url={primaryButton.url}
            />
          )}
          {secondaryButton.text && (
            <Button
              classes="c-button--hero-primary"
              text={secondaryButton.text}
              url={secondaryButton.url}
            />
          )}
        </div>
      </div>
      <ScrollIcon />
    </div>
  )
}
export default Hero
