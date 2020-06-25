import React, { Component } from 'react'

class NavBurger extends Component {
  state = {
    toggle: false,
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    })
  }

  render() {
    const { isToggled } = this.props
    const menuStatus = isToggled ? 'open' : 'closed'

    return (
      <>
        <div className={` c-site-head__hamburger--${menuStatus}`}>
          <span />
          <span />
          <span />
        </div>
      </>
    )
  }
}

export default NavBurger
