import React, { useRef, useEffect, createRef } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Button from '../../core/Button'
import ScrollIcon from '../../core/ScrollIcon'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

const Hero = ({ heroMediaContent, heroContent, classes = '' }) => {
  const { primaryButton, secondaryButton, heroTextBody } = heroContent
  const heroTextLineEls = useRef([])

  // const herTextLine
  // const heroTextLineEls = (el) => createRef(el)

  const updatedHeroTextBody = heroTextBody.split(/[\n]/g).map((line, index) => {
    const words = line.split(/[\s]/g).map((word, wordIndex) => (
      <span className="c-hero__text-word" key={wordIndex}>
        {word}{' '}
      </span>
    ))

    return (
      <span
        className="c-hero__text-line block"
        key={index}
        // ref={(el) => (heroTextLineEls[index] = el)}
        // ref={(line) => (heroTextLineEls = line)}
        // ref={heroTextLineEls}
      >
        {words}
      </span>
    )
  })

  const heroContentEl = useRef(null)
  const heroTextEl = useRef(null)
  const heroPrimaryButtonEl = useRef(null)
  const heroSecondaryButtonEl = useRef(null)
  const heroScrollIconEl = useRef(null)
  // const createRefs = updatedHeroTextBody.map((el) => console.log(el))
  // const createRefs = updatedHeroTextBody.map((el) => console.log(el))

  useEffect(() => {
    // console.log('created refs ==', createRefs)
    console.log('hero lines ref el==  ', heroTextLineEls)
    console.log('hero lines ref el current ==  ', heroTextLineEls.current)
    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: 'Power3.out' },
    })

    tl.set(heroContentEl.current, { css: { visibility: 'visible' } })
    tl.set(heroScrollIconEl.current, { css: { visibility: 'visible' } })
      .from(heroTextEl.current, 1.2, {
        y: 60,
        opacity: 0,
      })
      .from(
        heroPrimaryButtonEl.current,
        {
          y: 10,
          opacity: 0,
        },
        '-=0.3'
      )
      .from(heroSecondaryButtonEl.current, {
        y: 10,
        opacity: 0,
      })
      .from(heroScrollIconEl.current, 1, {
        y: 10,
        opacity: 0,
        delay: 0.2,
      })

    const tlScroll = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        scrub: 1,
      },
    })
    tlScroll.to(heroTextEl.current, 1, {
      y: '-300vh',
      opacity: 0,
      ease: 'Power3.out',
    })
    tlScroll.to(
      heroSecondaryButtonEl.current,
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
      heroPrimaryButtonEl.current,
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
      heroScrollIconEl.current,
      1,
      {
        transformOrigin: '50% 50%',
        y: '-150vh',
        // rotation: 360,
        opacity: 0,
        ease: 'Power3.out',
      },
      0
    )
  }, [])

  return (
    <div className={`c-hero ${classes}`}>
      <div className="c-hero__media-content">{heroMediaContent}</div>
      <div className="c-hero__content" ref={heroContentEl}>
        {updatedHeroTextBody && (
          <>
            <div className="c-hero__text" ref={heroTextEl}>
              {updatedHeroTextBody}
            </div>
          </>
        )}
        <div className="c-hero__buttons">
          {primaryButton.text && (
            <div
              className="c-hero__secondary-button"
              ref={heroSecondaryButtonEl}
            >
              <Button
                classes="c-button--ghost c-button--hero-secondary "
                text={secondaryButton.text}
                url={secondaryButton.url}
              />
            </div>
          )}
          {secondaryButton.text && (
            <div className="c-hero__secondary-button" ref={heroPrimaryButtonEl}>
              <Button
                classes="c-button--hero-primary"
                text={primaryButton.text}
                url={primaryButton.url}
              />
            </div>
          )}
        </div>
      </div>
      <ScrollIcon classes="c-scroll-icon--hero" ref={heroScrollIconEl} />
    </div>
  )
}
export default Hero
