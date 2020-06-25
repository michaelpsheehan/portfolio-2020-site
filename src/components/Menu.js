import React from 'react'
import { animated, config } from 'react-spring'
import { Transition } from 'react-spring/renderprops'

import MenuItem from './MenuItem'

const Menu = ({ isToggled }) => (
  <>
    <div
      className={`c-primary-nav__background ${
        isToggled ? 'c-primary-nav__background--open' : ''
      } `}
    >
      <ul className="c-primary-nav__list">
        <MenuItem isToggled={isToggled} name="Home" link="/" />
        <MenuItem isToggled={isToggled} name="My Work" link="/projects" />
        <MenuItem isToggled={isToggled} name="Contact Me" link="/contact" />
      </ul>
    </div>
  </>
)
export default Menu
