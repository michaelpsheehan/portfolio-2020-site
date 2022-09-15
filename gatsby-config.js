var path = require('path')

module.exports = {
  siteMetadata: {
    title: `Michael Sheehan Portfolio`,
    description: `Michael Sheehan web development portfolio`,
    siteUrl: 'http://157.245.46.3',
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
        url: 'http://157.245.46.3/api',

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
        layout: require.resolve(`./src/components/Layout.tsx`),
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
        icon: `src/images/favicon.jpg`, 
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Lato`,
          `Crimson Pro:300,400` 
        ],
        display: 'swap'
      }
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
        ignore: [
          './src/styles/components/core/overlay.scss', 
          // '../src/styles/components/core/overlay.scss', 
        ], // Ignore files/folders

        // whitelist: [
        //   'bg-black',
        //   'bg-article-red',
        //   'overlay',
        //   'bg-article-green',
        //   'video-react',
        //   'tl-edges',
        //   'tl-wrapper',
        // ],
        purgeCSSOptions: {
          safelist: [
            'bg-black',
            'c-overlay',
            'c-hero',
            'bg-article-red',
            'bg-article-green',
            'video-react',
            'tl-edges',
            'tl-wrapper',
            'video-react-video', 
            'container',
            /^vjs/,
            

          ]
      
        },

      },
    },
  ],
}
