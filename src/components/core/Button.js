import React from 'react'
import { Link } from 'gatsby'

const Button = ({ text, url, externalLink, classes = '' }) =>
  externalLink ? (
    <a href={url} target="_blank" className={`c-button ${classes}`}>
      {text}
    </a>
  ) : (
    <Link to={url} className={`c-button ${classes}`}>
      {text}
    </Link>
  )

export default Button
