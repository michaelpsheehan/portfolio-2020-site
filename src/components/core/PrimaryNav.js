import React, { Component, createRef, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MenuItem from './MenuItem'
import Overlay from './Overlay'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)


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

  componentWillUnmount() {
    
    this.tl?.kill()
  }

  render() {
    const { isOverlayOpen } = this.props

    return isOverlayOpen ? (
      <>
        <Overlay classes={`${isOverlayOpen ? 'c-overlay--open' : ''}`}>
          <nav className="c-primary-nav">
            <ul className="c-primary-nav__list" ref={this.menuEl}>
              {this.links.map((item, index) => (
                <MenuItem
                  key={item.id}
                  name={item.name}
                  link={item.link}
                  forwardedRef={(el) => (this.menuItemEls[index] = el)}
                />
              ))}
            </ul>
          </nav>
        </Overlay>
      </>
    ) : null
  }
}
export default memo(PrimaryNav)
