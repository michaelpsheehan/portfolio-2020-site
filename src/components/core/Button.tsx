import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

interface ButtonProps {
  text?: string
  url?: string
  externalLink?: boolean
  classes?: string
}

const Button: React.FC<ButtonProps> = ({
  text = 'Read More',
  url,
  externalLink = false,
  classes = '',
}: ButtonProps) => {
  const buttonClasses: string = `c-button ${classes}`
  // checks the type of button to use. If the button is purely visual with no functionality use a <span></span>
  let buttonType: React.ReactElement<HTMLAnchorElement  | HTMLDivElement | HTMLButtonElement>  = <button className={buttonClasses}>{text}</button>

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
      <AniLink
        className={buttonClasses}
        paintDrip
        direction="right"
        exit="cover"
        hex="#e3342f"
        to={url}
      >
        {text}
      </AniLink>
    )
  }

  return <>{buttonType}</>
}
export default Button
