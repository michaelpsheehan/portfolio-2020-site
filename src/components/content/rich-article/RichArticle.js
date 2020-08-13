import React, { Component, useRef, useEffect, createRef } from 'react'

import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimationBlock from './blocks/AnimationBlock'
import ImageBlock from './blocks/ImageBlock'
import TextBlock from './blocks/TextBlock'

import {
  // useGlobalDispatchContext,
  // useGlobalStateContext,
  // GlobalProvider,
  GlobalStateContext,
  GlobalDispatchContext,
} from '../../../context/globalContext'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

// class RichArticle extends Component = ({ richArticle, siteUrl, classes = '' }) => {
class RichArticle extends Component {
  // static contextType = useGlobalStateContext
  // static contextType = GlobalStateContext

  // static contextType = GlobalDispatchContext
  // static contextType = GlobalProvider()

  constructor() {
    super()
    this.tl = null
    this.richArticleBlockEl = []
  }

  componentDidMount() {
    // // console.log('this state  =', this.)
    // // console.log('CONTEXT  =', this.GlobalStateContext)
    // // const dispatch = useGlobalDispatchContext()
    // // const dispatch = useGlobalStateContext()
    // // const richArticleBlockEl = useRef(null)
    // console.log('this article block el ==', this.richArticleBlockEl)
    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     // trigger: '.js-dark-background',
    //     trigger: this.richArticleBlockEl,
    //     start: 'top 100px',
    //     end: 'bottom 100px',
    //     // onEnter: ({ progress, direction, isActive }) =>
    //     //   //  {
    //     //   // trigger = this.richArticleBlockEl.curre
    //     // // this.context({ type: 'TOGGLE_THEME', theme: 'light-ui-items' })
    //     // // dispatch({ type: "TOGGLE_THEME", theme: "light" })
    //     // // console.log(
    //     // //   progress,
    //     // //   direction,
    //     // //   isActive,
    //     // //   'onEnter richArticle -- UI WHITE---',
    //     // //   this.richArticleBlockEl.current
    //     // // ),
    //     // // },
    //     // onLeave: ({ progress, direction, isActive }) =>
    //     //   // this.context({ type: 'TOGGLE_THEME', theme: 'dark-ui-items' }),
    //     //   console.log(
    //     //     progress,
    //     //     direction,
    //     //     isActive,
    //     //     'default ui',
    //     //     this.richArticleBlockEl.current
    //     //   ),
    //     // onEnterBack: ({ progress, direction, isActive }) =>
    //     //   console.log(
    //     //     progress,
    //     //     direction,
    //     //     isActive,
    //     //     'WHITE UI again',
    //     //     this.richArticleBlockEl.current
    //     //   ),
    //     // onLeaveBack: ({ progress, direction, isActive }) =>
    //     //   console.log(
    //     //     progress,
    //     //     direction,
    //     //     isActive,
    //     //     'back to start',
    //     //     this.richArticleBlockEl.current
    //     //   ),
    //     // markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
    //     // scrub: 0.5,
    //   },
    // })
  }

  // checks the blockType from the matrix field and loads the appropriate component
  checkBlockType = (blockType, block) => {
    switch (blockType) {
      case 'text':
        return <TextBlock block={block} />
      case 'fullWidthImage':
        return <ImageBlock block={block} />
      case 'animation':
        return <AnimationBlock block={block} />
      default:
        return null
    }
  }

  render() {
    // console.log('this.props')
    const { richArticle, classes = '' } = this.props

    return richArticle ? (
      <article className={`c-rich-article ${classes}`}>
        {richArticle.map((block, index) => (
          <div
            className={`c-rich-article__block  ${
              block.backgroundColour && block.backgroundColour !== 'default'
                ? `js-dark-background text-white ${block.backgroundColour} `
                : ''
            }
          `}
            key={block.id}
            ref={
              block.backgroundColour !== 'default'
                ? (el) => (this.richArticleBlockEl[index] = el)
                : null
            }
          >
            {this.checkBlockType(block.typeHandle, block)}
          </div>
        ))}
      </article>
    ) : null
  }
}

export default RichArticle
