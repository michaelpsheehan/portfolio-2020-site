module.exports = {
  siteMetadata: {
    title: `Code By Sheen local name`,
    // titleTemplate: `%s · local title template`,
    description: `Michael Sheehan web development portfolio`,
    // siteUrl: 'http://157.245.46.3',
    siteUrl: 'https://www.michaelsheehan.dev',
    frontendSiteUrl: 'https://www.michaelsheehan.codes',

    twitterUsername: '@testLocalUser',
  },
  plugins: [
    {
      // Simple config, passing URL
      resolve: 'gatsby-source-graphql',
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: 'Craft',
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: 'craft',
        // url for the back end craft graphql api
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
        // name: `images`,
        // path: `${__dirname}/src/images`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-icon.png`, // This path is relative to the root of the site.
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
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        // host: 'https://portfolio-2020-staging.netlify.app/',
        // host: 'https://portfolio-2020-staging.netlify.app/',
        host: 'https://www.michaelsheehan.dev',
        // host: 'https://www.example.com',
        // sitemap: 'https://www.example.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        whitelist: ['bg-black', 'bg-article-red', 'bg-article-green'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },

    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: true,
        disable: !process.env.ANALYZE_BUNDLE_SIZE,
        generateStatFile: true,
        analyzerMode: 'static',
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
