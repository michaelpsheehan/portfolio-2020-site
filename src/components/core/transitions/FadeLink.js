import React from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'

const FadeLink = ({ to, children }) => (
  <TransitionLink
    className="c-transition-link border bg-black"
    to={to}
    exit={{ length: 2.5 }}
  >
    {children}
  </TransitionLink>
)

export default FadeLink
