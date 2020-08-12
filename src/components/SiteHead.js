// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PrimaryNav from './PrimaryNav'
import NavBurger from './NavBurger'
import changeTheme from './utilities/changeTheme'
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/globalContext'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

class SiteHead extends Component {
  constructor() {
    super()

    this.menuItemEls = null
  }

  state = { 
      toggled: !this.state.toggled,
    })
  }

  render() {
    // const siteTitle = this.props
    const isToggled = this.state.toggled

    return (
      <>
        <header
          className={`c-site-head fixed `}
          // //${
          //   this.props.isHomepage ? '' : 'bg-brand-blue'
          // }
          
          // `}
        >
          <div className="c-site-head__container container">
            <div className="c-site-head__components">
              <GlobalStateContext.Consumer>
                {(globalState) => (
                  <GlobalDispatchContext.Consumer>
                    {(dispatch) => {
                      const { currentTheme } = globalState
                      return (
                        <div
                          className="p-4 bg-brand-red text-white"
                          onClick={() => changeTheme(currentTheme, dispatch)}
                        >
                          {currentTheme}
                        </div>
                      )
                    }}
                  </GlobalDispatchContext.Consumer>
                )}
              </GlobalStateContext.Consumer>
              <div
                className="c-site-head__hamburger"
                onClick={this.toggleOverlay}
              >
                <NavBurger isToggled={isToggled} />
              </div>
              <PrimaryNav isToggled={isToggled} />
            </div>
          </div>
        </header>
      </>
    )
  }
}

export default SiteHead
