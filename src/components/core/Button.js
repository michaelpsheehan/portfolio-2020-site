import React from 'react'
import { Link } from 'gatsby'

const Button = ({ text, url, classes }) => (
  <Link to={url} className={`c-button ${classes || ''}`}>
    {text}
  </Link>
)

export default Button
