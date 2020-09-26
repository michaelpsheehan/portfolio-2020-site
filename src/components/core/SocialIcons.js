import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { twitterIcon, linkedInIcon, githubIcon } from '../../icons/socialIcons'

const SocialIcons = ({ twitter, linkedIn, github }) => {
  const data = useStaticQuery(query)
  const { twitterUsername, linkedinUrl, githubUrl } = data.craft.globalSet
  console.log('social icon data', data)
  console.log('twitter url ==', twitterUsername)
  console.log('linkedIN url ==', linkedinUrl)
  console.log('github url ==', githubUrl)

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
