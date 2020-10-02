import React, { createFactory, memo } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ title, description, socialMeta }) => {
  const { pathname } = useLocation()
  const { site, craft } = useStaticQuery(query)
  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    frontendSiteUrl,
  } = site.siteMetadata
  const [fallbacks, socialLinks] = craft.globalSets
  const twitterHandle = socialLinks.twitterUsername
  const fallbackImage = fallbacks.fallbackImage

  // checks for CMS data and uses fallbacks if not present

  // checks if there is a description from the SEO component in the CMS. If not it uses a fallback from the gatsby-config.js file
  let finalDescription = description === '' ? defaultDescription : description
  // checks if the twitter handle exists in the CMS. If not it uses a fallback from the gatsby-config.js file
  let twitterUsername = twitterHandle
    ? twitterHandle
    : site.siteMetadata.twitterUsername

  const seoData = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname}`,
  }

  let facebook = socialMeta ? socialMeta.facebook : null;
  let twitter = socialMeta ? socialMeta.twitter: null

  return (
    <Helmet title={seoData.title}>
      <meta name="description" content={finalDescription} />
      {twitter && twitter.image && (
        <meta
          name="image"
          content={`${siteUrl}${twitter.image.optimizedImagesGridThumbnail.src}`}
        />
      )}

      {pathname && frontendSiteUrl && (
        <meta property="og:url" content={`${frontendSiteUrl}${pathname}`} />
      )}

      {facebook && facebook.title && (
        <meta property="og:title" content={facebook.title} />
      )}

      {facebook && facebook.description && (
        <meta property="og:description" content={facebook.description} />
      )}

      {facebook && facebook.image && (
        <meta
          property="og:image"
          content={`${siteUrl}${facebook.image.optimizedImagesGridThumbnail.src}`}
        />
      )}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={`@${twitterUsername}`} />
      )}

      {twitter && twitter.title && (
        <meta name="twitter:title" content={twitter.title} />
      )}

      {twitter && twitter.description && (
        <meta name="twitter:description" content={twitter.description} />
      )}
      {twitter && twitter.image && (
        <meta
          name="twitter:image"
          content={`${siteUrl}${twitter.image.optimizedImagesGridThumbnail.src}`}
        />
      )}
    </Helmet>
  )
}

export default SEO

const query = graphql`
  query SEOQuery {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: siteUrl
        frontendSiteUrl
        twitterUsername
      }
    }
    craft {
      globalSets {
        ... on Craft_fallbacks_GlobalSet {
          id
          fallbackImage(optimizedImagesGridThumbnail: "") {
            id
            url
          }
        }
        ... on Craft_socialLinks_GlobalSet {
          id
          twitterUsername
          githubUrl
          linkedinUrl
        }
      }
    }
  }
`
