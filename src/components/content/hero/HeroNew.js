import React, { Component, useRef, useEffect, createRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger} from 'gsap/ScrollTrigger'
import Button from '../../core/Button'
import ScrollIcon from '../../core/ScrollIcon'
gsap.registerPlugin( ScrollTrigger);

class HeroNew extends Component {
  constructor() {
    super()
    // react refs needed to access dom elements for the gsap animations
    this.state = {
      isWordHovered: false,
    }
    this.heroEl = createRef()
    this.heroTextLineEls = []
    this.heroTextWordEls = []
    this.heroTextLetterEls = []
    this.heroContentEl = createRef()
    this.heroTextLineContainerEls = []
    this.heroSecondaryButtonEl = createRef()
    this.heroPrimaryButtonEl = createRef()
    this.heroScrollIconEl = createRef()
    // array of all words in the hero text
    this.allWords = []
    this.allLetters = []
    // gsap timelines
    this.tl = null
    this.scrollTimeline = null

    this.handleWordHover = this.handleWordHover.bind(this)
    this.handleWordHoverExit = this.handleWordHoverExit.bind(this)
    this.animateTextOnScroll = this.animateTextOnScroll.bind(this)
    this.resetLetters = this.resetLetters.bind(this)
    this.handleScrollUpdate = this.handleScrollUpdate.bind(this)
    this.handleWordTouchMobile = this.handleWordTouchMobile.bind(this)
  }

  resetLetters(delay = 0.01, duration = 0.1) {
    this.allLetters.map((letter) => {
      gsap.to(letter, {
        delay: delay,
        duration: duration,
        y: 0,
        x: 0,
        skewY: 0,
        rotation: 0,
      })
    })
  }

  handleWordHover(e) {
    this.setState({
      isWordHovered: true,
    })

    let word = e.currentTarget
    let letters = [...word.children]
    letters.forEach((letter) => {
      gsap.to(letter, {
        duration: 0.3,
        y: gsap.utils.random(-6, 6),
        x: gsap.utils.random(-6, 6),
        skewY: gsap.utils.random(1, 2, 1),
        rotation: gsap.utils.random(-30, 30),
      })
    })
  }

  handleWordHoverExit(e) {
    this.setState({
      isWordHovered: false,
    })

    // console.log('This state on leave ==', this.state)
    let word = e.currentTarget
    let letters = [...word.children]
    letters.forEach((letter) => {
      gsap.to(letter, {
        duration: 0.3,
        y: 0,
        x: 0,
        skewY: 0,
        rotation: 0,
      })
    })
  }

  handleWordTouchMobile() {
    this.resetLetters(0.7, 0.5)
    this.setState({
      isWordHovered: false,
    })

  }
  handleScrollUpdate(progress, isActive) {
    if (progress === 0 && this.state.isWordHovered === false) {
      this.resetLetters()
    }
  }

  animateTextOnScroll = (allWords, allLetters) => {
    let flatWordsArray = []
    allWords.map((currentWord) => {
      currentWord.forEach((currentWord) => {
        flatWordsArray = [...flatWordsArray, currentWord]
      })
    })
    let testing = []
    flatWordsArray.forEach((el) => {
      let childArray = [...el.children]
      childArray.forEach((word) => (testing = [...testing, word]))
    })
    this.scrollTimeline = gsap
      .timeline({
        scrollTrigger: {
          start: 'top top',
          scrub: 0.1,
          trigger: this.heroEl.current,
          onUpdate: ({ progress, direction, isActive }) =>
            this.handleScrollUpdate(progress, isActive),
          // markers: true,
        },
      })
      .to(allWords, {
        y: '-900px',
        ease: 'Power4.out',
        rotation: -60,
        skewY: 7,
        stagger: {
          amount: 0.01,
        },
      })
      .to(
        testing,
        {
          rotation: 120,
          x: -300,
          ease: 'Power4.out',
          stagger: {
            each: 0.007,
            from: 'random',
          },
        },
        '<'
      )
      .to(
        this.heroSecondaryButtonEl.current,
        {
          y: '-250%',
          x: '-500%',
          transformOrigin: '50% 50%',
          rotation: -360,
          ease: 'Power3.out',
        },
        0
      )
      .to(
        this.heroPrimaryButtonEl.current,
        {
          y: '-250%',
          x: '500%',
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
          y: '-1500',
          opacity: 0,
          ease: 'Power3.out',
        },
        0
      )
  }

  splitLetters = (word) => {
    const lettersArray = word.split('')
    const letters = lettersArray.map((letter, index) => (
      <span className="c-hero__text-letter inline-block" key={index}>
        {letter}
      </span>
    ))
    return letters
  }

  splitText(text) {
    if (text) {
      return text.split(/[\n]/g).map((line, index) => {
        const words = line.split(/[\s]/g).map((word, wordIndex) => {
          const lettersTest = this.splitLetters(word)
          return (
            // split and return every word from the hero text wrapped in a span to allow it to be targeted and animated by gsap
            <span
              className="c-hero__text-word inline-block cursor-pointer"
              key={wordIndex}
              ref={(currentWord) =>
                (this.heroTextWordEls[wordIndex] = currentWord)
              }
              onMouseEnter={this.handleWordHover}
              onMouseLeave={this.handleWordHoverExit}
              onTouchStart={this.handleWordTouchMobile}
            >
              {lettersTest}{' '}
            </span>
          )
        })

        return (
          // maintain the line breaks from the CMS. wrap the array of words in each line of text
          <span
            className="c-hero__line-container  relative  w-full block"
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

    let flatWordsArray = []
    this.allWords.map((currentWord) => {
      currentWord.forEach((currentWord) => {
        flatWordsArray = [...flatWordsArray, currentWord]
      })
    })
    let testing = []
    flatWordsArray.forEach((el) => {
      let childArray = [...el.children]
      childArray.forEach(
        (word) => (this.allLetters = [...this.allLetters, word])
      )
    })

    this.tl = gsap
      .timeline({
        defaults: { duration: 0.8, ease: 'Power3.out' },
        // create the scrollTrigger timeline after the intro completes to stop any early scroll bugs
        onComplete: this.animateTextOnScroll,
        onCompleteParams: [this.allWords, this.allLetters],
        onCompleteScope: this,
      })
      .set(this.heroContentEl.current, { css: { visibility: 'visible' } })
      .set(this.heroScrollIconEl.current, { css: { visibility: 'visible' } })

    let allLetts = this.allLetters

    allLetts.forEach((letter) => {
      this.tl.set(letter, {
        y: gsap.utils.random(-400, 400),
        x: gsap.utils.random(-400, 400),
        skewY: gsap.utils.random(0, 9, 1),
        rotation: gsap.utils.random(-360, 360),
        opacity: 0,
      })
    })

    this.tl.to(this.allLetters, {
      delay: 2.4,
      duration: 0.7,
      rotation: 0,
      y: 0,
      x: 0,
      opacity: 1,
      ease: 'Power2.out',
      skewY: 0,
      stagger: {
        each: 0.015,
        from: 'random',
      },
    })

    this.tl
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
  }

  componentWillUnmount() {
    //  cleanup gsap animations and scroll trigger
    this.tl.kill()
    if (this.scrollTimeline) {
      this.scrollTimeline.kill()
      this.scrollTimeline.scrollTrigger.kill()
    }
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
              <h1 className="c-hero__text ">{updatedHeroTextBody}</h1>
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
