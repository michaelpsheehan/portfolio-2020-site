import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import { ImageUtils } from 'three'

const SEO = ({
  title,
  description,
  image,
  socialMeta,
  fallbackImage,
  twitterHandle,
}) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  console.log('default description passed to seo ===', description)
  
  const { defaultTitle, defaultDescription, siteUrl, frontendSiteUrl } = site.siteMetadata
  console.log('seo meta --', socialMeta)
  // console.log('PATHNAME=', pathname)


  // checks for CMS data and uses fallbacks if not present

  // checks if there is a description from the SEO component in the CMS. If not it uses a fallback from the gatsby-config.js file
  let finalDescription = description === '' ? defaultDescription : description
  // checks if the twitter handle exists in the CMS. If not it uses a fallback from the gatsby-config.js file
  let twitterUsername = twitterHandle
    ? twitterHandle
    : site.siteMetadata.twitterUsername
  // checks if a custom social share image has been added in the CSSMediaRule.  If not it uses a standard fallback image from the CMS
  let fallbackShareImage = fallbackImage
    ? `${siteUrl}${fallbackImage[0].url}`
    : null

  // creates the object that will store the final facebook and twitter share data
  let socialAccounts = {
    facebook: {},
    twitter: {},
  }

  if (socialMeta) {
    for (let socialAccount in socialMeta) {
      //  checks the facebook and twitter data to see if they have custom data and Images. If not the standard description is used. The final socialAccounts object is updated with the new data and this is used to create the social meta tags in the render function
      let currentSocialAccount = socialMeta[socialAccount]
console.log('current social account ==', currentSocialAccount)
      let updatedSocialMeta = {}
      updatedSocialMeta = {
        title: currentSocialAccount.title ? currentSocialAccount.title : title,
        description: currentSocialAccount.description
          ? currentSocialAccount.description
          : finalDescription,
        socialImage: currentSocialAccount.image
          ? `${siteUrl}${currentSocialAccount.image.optimizedImagesGridThumbnail.src}`
          : fallbackShareImage,
      }
      socialAccounts[socialAccount] = updatedSocialMeta
    }
  }

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname}`,
  }

  const { facebook, twitter } = socialAccounts

  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      {image && <meta name="image" content={seo.image} />}

      {(pathname && frontendSiteUrl) && <meta property="og:url" content={`${frontendSiteUrl}${pathname}`} />}

      {facebook && facebook.title && (
        <meta property="og:title" content={facebook.title} />
      )}

      {facebook && facebook.description && (
        <meta property="og:description" content={facebook.description} />
      )}

      {facebook && facebook.socialImage && (
        <meta property="og:image" content={facebook.socialImage} />
      )}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      {twitter && twitter.title && (
        <meta name="twitter:title" content={twitter.title} />
      )}

      {twitter && twitter.description && (
        <meta name="twitter:description" content={twitter.description} />
      )}
      {twitter && twitter.socialImage && (
        <meta name="twitter:image" content={twitter.socialImage} />
      )}
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

SEO.defaultProps = {
  title: null,
  description: null,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: siteUrl,
        frontendSiteUrl,
        twitterUsername
      }
    }
  }
`
