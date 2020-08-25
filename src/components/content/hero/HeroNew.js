import React, { Component, useRef, useEffect, createRef } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../core/Button'
import ScrollIcon from '../../core/ScrollIcon'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

class HeroNew extends Component {
  constructor() {
    super()
    // react refs needed to access dom elements for the gsap animations
    this.heroEl = createRef()
    this.heroTextLineEls = []
    this.heroTextWordEls = []
    this.heroContentEl = createRef()
    this.heroTextLineContainerEls = []
    this.heroSecondaryButtonEl = createRef()
    this.heroPrimaryButtonEl = createRef()
    this.heroScrollIconEl = createRef()
    // array of all words in the hero text
    this.allWords = []
    // gsap timelines
    this.tl = null
    this.scrollTimeline = null
  }

  animateTextOnScroll = (allWords) => {
    console.log('animate on Scroll this --', this)
    this.scrollTimeline = gsap
      .timeline({
        scrollTrigger: {
          start: 'top top',
          scrub: 0.1,
          trigger: this.heroEl.current,
          // markers: true
        },
      })
      .to([allWords[0], allWords[1]], {
        y: '-300vh',
        ease: 'Power4.out',
        rotation: -360,
        skewY: 7,
        stagger: {
          amount: 0.01,
        },
      })
      .to(
        this.heroSecondaryButtonEl.current,
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
      .to(
        this.heroPrimaryButtonEl.current,
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
      .to(
        this.heroScrollIconEl.current,
        {
          transformOrigin: '50% 50%',
          y: '-150vh',
          opacity: 0,
          ease: 'Power3.out',
        },
        0
      )
  }

  splitText(text) {
    if (text) {
      return text.split(/[\n]/g).map((line, index) => {
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
          // maintain the line breaks from the CMS. wrap the array of words in each line of text
          <span
            className="c-hero__line-container overflow-hidden relative  w-full block"
            key={index}
            ref={(el) => (this.heroTextLineContainerEls[index] = el)}
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
    }
  }

  componentDidMount() {
    this.allWords = Array.from(this.heroTextLineEls).map((currentLine, i) => [
      ...this.allWords,
      ...currentLine.children,
    ])

    this.tl = gsap
      .timeline({
        defaults: { duration: 1, ease: 'Power3.out' },
        // create the scrollTrigger timeline after the intro completes to stop any early scroll bugs
        onComplete: this.animateTextOnScroll,
        onCompleteParams: [this.allWords],
        onCompleteScope: this,
      })
      .set(this.heroContentEl.current, { css: { visibility: 'visible' } })
      .set(this.heroScrollIconEl.current, { css: { visibility: 'visible' } })

      .from(this.heroTextLineEls, {
        delay: 2.6,
        duration: 1,
        y: '140',
        ease: 'Power4.out',
        skewY: 7,
        stagger: {
          amount: 0.32,
        },
      })
      .from(this.heroPrimaryButtonEl.current, {
        y: 10,
        opacity: 0,
      })
      .from(this.heroSecondaryButtonEl.current, {
        y: 10,
        opacity: 0,
      })
      .from(
        this.heroScrollIconEl.current,
        1,
        {
          y: 10,
          opacity: 0,
          delay: 0.2,
        },
        '-=0.5'
      )

      .set(this.heroTextLineContainerEls, {
        css: { overflow: 'visible' },
      })
  }

  componentWillUnmount() {
    //  cleanup gsap animations and scroll trigger
    this.tl.kill()
    this.scrollTimeline.kill()
    this.scrollTimeline.scrollTrigger.kill()
  }

  render() {
    const { heroMediaContent, heroContent, classes = '' } = this.props
    const { primaryButton, secondaryButton, heroTextBody } = heroContent
    const updatedHeroTextBody = this.splitText(heroTextBody)

    return (
      <div className={`c-hero ${classes}`} ref={this.heroEl}>
        {/* show hero bg image or video if available */}
        {heroMediaContent && (
          <div className="c-hero__media-content">{heroMediaContent}</div>
        )}
        <div className="c-hero__content" ref={this.heroContentEl}>
          {updatedHeroTextBody && (
            <>
              <div className="c-hero__text ">{updatedHeroTextBody}</div>
            </>
          )}
          <div className="c-hero__buttons">
            {secondaryButton.text && (
              <div
                className="c-hero__secondary-button mb-8 md:mb-0"
                ref={this.heroSecondaryButtonEl}
              >
                <Button
                  classes="c-button--ghost c-button--hero-secondary "
                  text={secondaryButton.text}
                  url={secondaryButton.url}
                />
              </div>
            )}
            {primaryButton.text && (
              <div
                className="c-hero__primary-button "
                ref={this.heroPrimaryButtonEl}
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
        <ScrollIcon classes="c-scroll-icon--hero" ref={this.heroScrollIconEl} />
      </div>
    )
  }
}

export default HeroNew
