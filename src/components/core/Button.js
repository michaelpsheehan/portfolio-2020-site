import React from 'react'
import { Link } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

// import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Button = ({
  text = 'Read More',
  url,
  externalLink = false,
  classes = '',
}) => {
  const buttonClasses = `c-button ${classes}`
  // checks the type of button to use. If the button is purely visual with no functionality use a <span></span>
  let buttonType = <span className={buttonClasses}>{text}</span>

  if (url) {
    buttonType = externalLink ? (
      // if the button is for an external link us an <a></a> tag
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {text}
      </a>
    ) : (
      // if the button links to an internal page use a Gatsby Link component
      // <AniLink
      //   className={`test-class ${buttonClasses}`}
      //   // cover
      //   cover
      //   // direction="left"
      //   // top="exit"
      //   to={url}
      //   bg="#1a68af"
      // >

      <AniLink
        // duration="0.3"
        className={buttonClasses}
        // cover
        paintDrip
        direction="right"
        exit="cover"
        // hex="#5891C4"
        hex="#e3342f"
        // hex="#1A68AF"
        to={url}
      >
        {text}
      </AniLink>
    )
  }

  return <>{buttonType}</>
}
export default Button
