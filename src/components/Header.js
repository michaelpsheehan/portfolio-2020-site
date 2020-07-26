// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Menu from './Menu'
import NavBurger from './NavBurger'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

class Header extends Component {
  constructor() {
    super()

    this.menuItemEls = null
  }

  state = {
    toggle: false,
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    })
  }

  render() {
    // const siteTitle = this.props
    const isToggled = this.state.toggle

    return (
      <>
        <header
          className={`c-site-head ${
            this.props.isHomepage ? '' : 'bg-brand-blue'
          }`}
        >
          <div className="c-site-head__container container">
            <div className="c-site-head__components">
              <div className="c-site-head__hamburger" onClick={this.toggle}>
                <NavBurger isToggled={isToggled} />
              </div>
              <Menu isToggled={isToggled} />
              {/* <div className=" header navbar" /> */}
            </div>
          </div>
        </header>
      </>
    )
  }
}
// Header.propTypes = {
// siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
