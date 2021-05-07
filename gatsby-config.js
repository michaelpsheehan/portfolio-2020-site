var path = require('path')

module.exports = {
  siteMetadata: {
    title: `Michael Sheehan Portfolio`,
    description: `Michael Sheehan web development portfolio`,
    siteUrl: 'https://www.michaelsheehan.dev',
    frontendSiteUrl: 'https://www.codebysheen.com',
    twitterUsername: '@codebysheen',
  },
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: 'Craft',
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: 'craft',
        url: 'https://www.michaelsheehan.dev/api',

        headers: {
          Authorization: `Bearer ${process.env.CRAFTQL_API_KEY}`,
        },
      },
    },

    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: 'gatsby-plugin-transition-link',
      options: {
        layout: require.resolve(`./src/components/Layout.js`),
      },
    },

    `gatsby-plugin-sitemap`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.jpg`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Lato`,
          },
          {
            family: 'Crimson Pro:300,400',
          },
        ],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [require('tailwindcss')('./tailwind.js')],
      },
    },
    // {
    //   resolve: `gatsby-plugin-sass`,
    //   options: {
    //     postCssPlugins: [require('tailwindcss')('./tailwind.js')],
    //   },
    // },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.codebysheen.com',
        sitemap: 'https://www.codebysheen.com/sitemap.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/projects/carousel', '/projects/true-north'],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        tailwind: true, // Enable tailwindcss support
        whitelist: [
          'bg-black',
          'bg-article-red',
          'bg-article-green',
          'video-react',
          'tl-edges',
          'tl-wrapper',
        ],
        whitelistPatterns: [/^video-react/, /^vjs/],
        whitelistPatternsChildren: [/^video-react/],
      },
    },
  ],
}
