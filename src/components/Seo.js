import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, social, article }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    twitterUsername,
  } = site.siteMetadata
  let facebook;
  let twitter;
  if(social) {

  facebook = social.facebook;
  twitter = social.twitter

  }
  console.log('social is', facebook, twitter)

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,

    url: `${siteUrl}${pathname}`,
  }



  return (
    <Helmet title={seo.title}
    >
      <meta name="description" content={seo.description} />
    
     {image &&  <meta name="image" content={seo.image} /> }
      }

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(facebook && facebook.title) && <meta property="og:title" content={facebook.title} />}

      {(facebook && facebook.description) && (
        <meta property="og:description" content={facebook.description} />
      )}

      {(facebook && facebook.image.optimizedImagesGridThumbnail) && <meta property="og:image" content={`${siteUrl}${facebook.image.optimizedImagesGridThumbnail.src}`} />}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      {(twitter && twitter.title) && <meta name="twitter:title" content={twitter.title} />}

      {(twitter && twitter.description) && (
        <meta name="twitter:description" content={twitter.description} />
      )}

      {(twitter && twitter.image.optimizedImagesGridThumbnail) && <meta name="twitter:image" content={`${siteUrl}${twitter.image.optimizedImagesGridThumbnail.src}`} />}
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: siteUrl
        twitterUsername
      }
    }
  }
`