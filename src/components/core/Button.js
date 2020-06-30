import React from 'react'
import { Link } from 'gatsby'

const Button = ({ text, url }) => (
  <Link to={url} className="c-button">
    {text}
  </Link>
)

export default Button
