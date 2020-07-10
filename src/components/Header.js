// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NavBurger from './NavBurger'
import Menu from './Menu'

class Header extends Component {
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
        <header className="c-site-head">
          <div className="c-site-head__container container">
            <div className="c-site-head__components">
              <div className="c-site-head__hamburger" onClick={this.toggle}>
                <NavBurger isToggled={isToggled} />
              </div>
              <Menu isToggled={isToggled} />
              <div className=" header navbar" />
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
