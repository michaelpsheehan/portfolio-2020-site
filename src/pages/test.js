import React from 'react'
// import { Link } from 'gatsby'
// import AniLink from 'gatsby-plugin-transition-link/AniLink'
// import Layout from '../components/Layout'
import TransitionLink from 'gatsby-plugin-transition-link'

const Test = () => (
  <>
    <h1>TEST PAGE DIS IS</h1>{' '}
    <TransitionLink
      to="/test-2"
      exit={{
        trigger: ({ node, e, exit, entry }) =>
          console.log('exit trigger', node, e, exit, entry),
        delay: 9.5,
        // here node refers to the DOM node of the entering page
      }}
      entry={{
        trigger: ({ node, e, exit, entry }) =>
          console.log('enter trigger', node, e, exit, entry),
        delay: 3.5,
        // here node refers to the DOM node of the entering page
      }}
    >
      Go to page 2
    </TransitionLink>
  </>
)

export default Test
