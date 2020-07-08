import React from 'react'
import { Link } from 'gatsby'

const Button = ({
  text = 'Read More',
  url,
  externalLink = false,
  classes = '',
}) => {
  // checks the type of button to use. If the button is purely visual with no functionality use a <span></span>
  let buttonType = <span className={`c-button ${classes}`}>{text}</span>

  if (url) {
    buttonType = externalLink ? (
      // if the button is for an external link us an <a></a> tag
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`c-button ${classes}`}
      >
        {text}
      </a>
    ) : (
      // if the button links to an internal page use a Gatsby Link component
      <Link to={url} className={`c-button ${classes}`}>
        {text}
      </Link>
    )
  }

  return <>{buttonType}</>
}
export default Button
