// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PrimaryNav from './PrimaryNav'
import NavBurger from './NavBurger'

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
              <GlobalStateContext.Consumer>
                {(globalState) => (
                  <GlobalDispatchContext.Consumer>
                    {(dispatch) => (
                      <div
                        className="p-4 bg-brand-red text-white"
                        onClick={() => {
                          console.log('GLOBAL STATE ==', globalState)
                          const { currentTheme } = globalState
                          if (currentTheme === 'dark-ui-items') {
                            dispatch({
                              type: 'CHANGE_THEME',
                              theme: 'light-ui-items',
                            })
                          } else {
                            dispatch({
                              type: 'CHANGE_THEME',
                              theme: 'dark-ui-items',
                            })
                          }
                        }}
                      >
                        {globalState.currentTheme}
                      </div>
                    )}
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
