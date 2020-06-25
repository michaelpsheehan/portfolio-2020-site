import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import { animated } from 'react-spring'
import { Transition } from 'react-spring/renderprops'
import { Link } from 'gatsby'

const MenuItem = ({ isToggled, name, link }) => (
  <>
    <div>
      <Link to={link}>
        <li className="c-primary-nav__list-item"> {name}</li>
      </Link>
    </div>
  </>
)

export default MenuItem
