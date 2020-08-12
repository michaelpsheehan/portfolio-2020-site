// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import changeTheme from './utilities/changeTheme'
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/globalContext'

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, ScrollTrigger)

class ThemeButton extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <>
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
      </>
    )
  }
}

export default ThemeButton
