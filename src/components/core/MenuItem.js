import React from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'
import {
  transitionStandard,
  exitTransition,
} from './transitions/TransitionCover'

import { useGlobalDispatchContext } from '../../context/globalContext'

const MenuItem = ({ name, link, forwardedRef }) => {
  const dispatch = useGlobalDispatchContext()
  const closeOverlay = () => {
    dispatch({
      type: 'CHANGE_OVERLAY',
      newStatus: 'closed',
    })
  }

  const interestingExitAnimation = (exit, node, e, entry) => {
    transitionStandard()
  }

  const onPageEnter = (node, e, exit, entry) => {
    exitTransition(node)
    closeOverlay()
  }

  return (
    <li className="c-primary-nav__list-item">
      <span className="c-primary-nav__link-animation-wrapper">
        <span className="c-primary-nav__link-animated-el" ref={forwardedRef}>
          <TransitionLink
            to={link}
            className="c-primary-nav__list-item-link"
            activeClassName="is-current-page"
            exit={{
              trigger: ({ node, e, exit, entry }) =>
                interestingExitAnimation(exit, node, e, entry),
              length: 1,
            }}
            entry={{
              delay: 1,
              trigger: ({ node, e, exit, entry }) =>
                onPageEnter(node, e, exit, entry),
            }}
          >
            {name}
          </TransitionLink>
        </span>
      </span>
    </li>
  )
}

export default MenuItem
