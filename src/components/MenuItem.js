import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import TransitionLink from 'gatsby-plugin-transition-link'

import { Link } from 'gatsby'

const MenuItem = ({ name, link, forwardedRef }) => (
  <li className="c-primary-nav__list-item">
    <span className="block overflow-hidden">
      <span className="block" ref={forwardedRef}>
        <AniLink className="c-primary-nav__list-item-link" activeClassName="is-current-page" paintDrip to={link}>
          {name}
        </AniLink>
      </span>
    </span>
  </li>
)

export default MenuItem
