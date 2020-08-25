import React, { Component, createRef } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import MenuItem from './MenuItem'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)
class PrimaryNav extends Component {
  constructor() {
    super()
    this.menuEl = createRef()
    this.menuItemEls = []
    this.tl = null
    this.links = [
      { name: 'Home', link: '/', id: 1 },
      { name: 'My Work', link: '/projects', id: 2 },
      { name: 'Contact Me', link: '/contact', id: 3 },
    ]
  }

  componentDidMount() {
    this.tl = gsap.timeline()
  }

  componentDidUpdate() {
    if (this.props.isOverlayOpen === true) {
      this.tl.from(this.menuItemEls, {
        duration: 0.8,
        y: 140,
        ease: 'Power4.out',
        skewY: 5,
        stagger: {
          amount: 0.3,
        },
      })
    }
  }

  render() {
    const { isOverlayOpen } = this.props

    return isOverlayOpen ? (
      <>
        <div
          className={`c-primary-nav__background ${
            isOverlayOpen ? 'c-primary-nav__background--open' : ''
          } `}
        >
          <ul className="c-primary-nav__list " ref={this.menuEl}>
            {this.links.map((item, index) => (
              <MenuItem
                key={item.id}
                name={item.name}
                link={item.link}
                forwardedRef={(el) => (this.menuItemEls[index] = el)}
              />
            ))}
          </ul>
        </div>
      </>
    ) : null
  }
}
export default PrimaryNav
