import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, socialMeta, article, fallbackImage, twitterHandle }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
  
  } = site.siteMetadata

  let twitterUsername = twitterHandle ? twitterHandle : site.siteMetadata.twitterUsername;
  let facebook;
  let twitter;

  // global fallback social share image is used if no custom share image has been added to the entry. Returns null if no global share image is added
  let fallbackShareImage = fallbackImage ? `${siteUrl}${fallbackImage[0].url}` : null

  if(socialMeta) {
  facebook = {
   title: socialMeta.facebook.title ? socialMeta.facebook.title : title,
   description: socialMeta.facebook.description ? socialMeta.facebook.description : description,
   socialImage: socialMeta.facebook.image.optimizedImagesGridThumbnail ? `${siteUrl}${socialMeta.facebook.image.optimizedImagesGridThumbnail.src}` : fallbackShareImage
  };
  twitter = socialMeta.twitter

  }

  let socialAccounts = {
    facebook: {

    },
    twitter: {}
  } ;
   for(let socialAccount in socialMeta) {
    let currentSocialAccount = socialMeta[socialAccount]

    let updatedSocialMeta = {}
// console.log('obj --',socialMeta[socialAccount])
    updatedSocialMeta = {
      title: currentSocialAccount.title ? currentSocialAccount.title : title,
      description: currentSocialAccount.description ? currentSocialAccount.description : description,
      socialImage: currentSocialAccount.image ? `${siteUrl}${currentSocialAccount.image.optimizedImagesGridThumbnail.src}` : fallbackShareImage
     };


    //  console.log('updated social meta --', updatedSocialMeta)
       socialAccounts[socialAccount]  = updatedSocialMeta
  }

  console.log('social accounts after loop --', socialAccounts)
  // console.log('fallback image in SEO ---', fallbackImage)
  // console.log('twitter handle in SEO ---', twitterHandle)

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,

    url: `${siteUrl}${pathname}`,
  }

// console.log('title from plugin ==', title)
console.log('Social OBJ --==', socialMeta)
// console.log('FACEBOOK OBJ --==', facebook)

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

      {/* {(facebook && facebook.image.optimizedImagesGridThumbnail) && <meta property="og:image" content={`${siteUrl}${facebook.image.optimizedImagesGridThumbnail.src}`} />} */}
      {(facebook && facebook.socialImage) && <meta property="og:image" content={facebook.socialImage} />}

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