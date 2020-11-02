import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { twitterIcon, linkedInIcon, githubIcon } from '../../icons/socialIcons'

interface SocialIconsProps {
  twitter?: boolean
   linkedIn?: boolean
   github?: boolean
}

interface globalSocialUrlQuery {
    craft:  {
      globalSet:  {
        twitterUsername: string
        linkedinUrl: string
        githubUrl: string
      }
    }
}

const SocialIcons: React.FC<SocialIconsProps> = ({ twitter, linkedIn, github }:SocialIconsProps) => {
  const data: globalSocialUrlQuery = useStaticQuery(query)
  const { twitterUsername, linkedinUrl, githubUrl } = data.craft.globalSet

  return (
    <div className="c-social-icons">
      {twitter && twitterUsername && (
        <a
          href={`https://twitter.com/${twitterUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="c-social-icons__icon"
        >
          {twitterIcon}
        </a>
      )}
      {linkedIn && linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="c-social-icons__icon"
        >
          {linkedInIcon}
        </a>
      )}
      {github && githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="c-social-icons__icon"
        >
          {githubIcon}
        </a>
      )}
    </div>
  )
}

export default SocialIcons

const query = graphql`
  query socialIconQuery {
    craft {
      globalSet(handle: "socialLinks") {
        ... on Craft_socialLinks_GlobalSet {
          twitterUsername
          linkedinUrl
          githubUrl
        }
      }
    }
  }
`
