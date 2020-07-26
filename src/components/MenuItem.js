import React from 'react'

import { Link } from 'gatsby'

const MenuItem = ({ name, link, forwardedRef }) => (
  <div ref={forwardedRef}>
    <Link activeClassName="active-menu-item" to={link}>
      <li className="c-primary-nav__list-item"> {name}</li>
    </Link>
  </div>
)

export default MenuItem
