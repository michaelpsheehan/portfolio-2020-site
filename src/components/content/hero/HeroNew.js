import React, { Component, useRef, useEffect, createRef } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Button from '../../core/Button'
import ScrollIcon from '../../core/ScrollIcon'

// const heroAnimations = () => {

// }

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

class HeroNew extends Component {
  constructor() {
    super()
    // react refs needed to access dom elements for the gsap animations
    this.heroTextLineEls = []
    this.heroTextWordEls = []
    this.heroContentEl = createRef()
    this.allWords = []
    this.heroTextLineContainerEls = []
    this.heroSecondaryButtonEl = null
    this.heroPrimaryButtonEl = null
    this.heroScrollIconEl = null
  }

  componentDidMount() {
    this.allWords = Array.from(this.heroTextLineEls).map((currentLine, i) => [
      ...this.allWords,
      ...currentLine.children,
    ])

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: 'Power3.out' },
    })
    tl.set(this.heroContentEl.current, { css: { visibility: 'visible' } })
    tl.set(this.heroScrollIconEl, { css: { visibility: 'visible' } })

    tl.from(this.heroTextLineEls, {
      delay: 3.8,
      duration: 1,
      y: '140',
      ease: 'Power4.out',
      skewY: 7,
      stagger: {
        amount: 0.32,
      },
    })
      .from(this.heroPrimaryButtonEl, {
        y: 10,
        opacity: 0,
      })
      .from(this.heroSecondaryButtonEl, {
        y: 10,
        opacity: 0,
      })
      .from(
        this.heroScrollIconEl,
        1,
        {
          y: 10,
          opacity: 0,
          delay: 0.2,
        },
        '-=0.5'
      )

    tl.set(this.heroTextLineContainerEls, { css: { overflow: 'visible' } })

    const tlScroll = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        scrub: 0.1,
      },
    })
    tlScroll.to([...this.allWords[0], ...this.allWords[1]], {
      duration: 0.2,
      y: '-300vh',
      ease: 'Power4.out',
      rotation: -360,
      skewY: 7,
      stagger: {
        amount: 0.01,
      },
    })
    tlScroll.to(
      this.heroSecondaryButtonEl,
      1,
      {
        y: '-25vh',
        x: '-100vw',
        opacity: 0,
        transformOrigin: '50% 50%',
        rotation: -360,
        ease: 'Power3.out',
      },
      0
    )
    tlScroll.to(
      this.heroPrimaryButtonEl,
      1,
      {
        y: '-25vh',
        x: '100vw',
        opacity: 0,
        transformOrigin: '50% 50%',
        rotation: 360,
        ease: 'Power3.out',
      },
      0
    )
    tlScroll.to(
      this.heroScrollIconEl,
      0.5,
      {
        transformOrigin: '50% 50%',
        y: '-150vh',
        opacity: 0,
        ease: 'Power3.out',
      },
      0
    )
  }

  render() {
    const { heroMediaContent, heroContent, classes = '' } = this.props
    const { primaryButton, secondaryButton, heroTextBody } = heroContent

    console.log('hero text body ==', heroTextBody)
    const updatedHeroTextBody = heroTextBody
      // split the text on each new line /n
      .split(/[\n]/g)
      .map((line, index) => {
        const words = line.split(/[\s]/g).map((word, wordIndex) => (
          // split and return every word from the hero text wrapped in a span to allow it to be targeted and animated by gsap
          <span
            className="c-hero__text-word inline-block"
            key={wordIndex}
            ref={(currentWord) =>
              (this.heroTextWordEls[wordIndex] = currentWord)
            }
          >
            {word}{' '}
          </span>
        ))

        return (
          // maintain the line breaks from the CMS. wrap the array of words in each line
          <span
            className="c-hero__line-container overflow-hidden relative  w-full block"
            key={index}
            ref={(containerEl) =>
              (this.heroTextLineContainerEls[index] = containerEl)
            }
          >
            <span
              className="c-hero__text-line block"
              ref={(el) => (this.heroTextLineEls[index] = el)}
            >
              {words}
            </span>
          </span>
        )
      })

    return (
      <div className={`c-hero ${classes}`}>
        {/* show hero bg image or video if available */}
        {heroMediaContent && (
          <div className="c-hero__media-content">{heroMediaContent}</div>
        )}
        <div
          className="c-hero__content"
          ref={(div) => (this.heroContentEl.current = div)}
        >
          {updatedHeroTextBody && (
            <>
              <div className="c-hero__text ">{updatedHeroTextBody}</div>
            </>
          )}
          <div className="c-hero__buttons">
            {primaryButton.text && (
              <div
                className="c-hero__secondary-button"
                ref={(button) => (this.heroSecondaryButtonEl = button)}
              >
                <Button
                  classes="c-button--ghost c-button--hero-secondary "
                  text={secondaryButton.text}
                  url={secondaryButton.url}
                />
              </div>
            )}
            {secondaryButton.text && (
              <div
                className="c-hero__secondary-button"
                ref={(el) => (this.heroPrimaryButtonEl = el)}
              >
                <Button
                  classes="c-button--hero-primary"
                  text={primaryButton.text}
                  url={primaryButton.url}
                />
              </div>
            )}
          </div>
        </div>
        <ScrollIcon
          classes="c-scroll-icon--hero"
          ref={(scroll) => (this.heroScrollIconEl = scroll)}
        />
      </div>
    )
  }
}

export default HeroNew
