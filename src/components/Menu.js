import React, { Component, createRef } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import MenuItem from './MenuItem'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)
class Menu extends Component {
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
    if (this.props.isToggled === true) {
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
    const { isToggled } = this.props

    return isToggled ? (
      <>
        <div
          className={`c-primary-nav__background ${
            isToggled ? 'c-primary-nav__background--open' : ''
          } `}
        >
          <ul className="c-primary-nav__list " ref={this.menuEl}>
            {this.links.map((item, index) => (
              // <span className=" overflow-hidden" key={item.id}>
              <MenuItem
                key={item.id}
                name={item.name}
                link={item.link}
                forwardedRef={(el) => (this.menuItemEls[index] = el)}
              />
              // </span>
            ))}
          </ul>
        </div>
      </>
    ) : null
  }
}
export default Menu
