// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PrimaryNav from './PrimaryNav'
import NavBurger from './NavBurger'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

class SiteHead extends Component {
  constructor() {
    super()

    this.menuItemEls = null
  }

  state = {
    toggled: false,
  }

  toggleOverlay = () => {
    this.setState({
      toggled: !this.state.toggled,
    })
  }

  render() {
    // const siteTitle = this.props
    const isToggled = this.state.toggled

    return (
      <>
        <header
          className={`c-site-head ${
            this.props.isHomepage ? '' : 'bg-brand-blue'
          }`}
        >
          <div className="c-site-head__container container">
            <div className="c-site-head__components">
              <div className="c-site-head__hamburger" onClick={this.toggleOverlay}>
                <NavBurger isToggled={isToggled} />
              </div>
              <PrimaryNav isToggled={isToggled} />
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

export default SiteHead
