import React from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'
import { transitionStandard, exitTransition } from './transitions/TransitionCover'
import { useGlobalDispatchContext, ActionTypes } from '../../context/globalContext'
import { IPageTransitionProps } from '../../types/types'

interface IProps {
  name: string;
  link: string;
  forwardedRef: React.LegacyRef<HTMLSpanElement> | undefined;
}

const MenuItem = ({ name, link, forwardedRef }: IProps) => {

  const dispatch = useGlobalDispatchContext()
  
  const closeOverlay = () => dispatch({type: ActionTypes.CLOSE_OVERLAY})
  

  return (
    <li className="c-primary-nav__list-item">
      <span className="c-primary-nav__link-animation-wrapper">
        <span className="c-primary-nav__link-animated-el" ref={forwardedRef}>
          <TransitionLink
            tabIndex={0}
            to={link}
            className="c-primary-nav__list-item-link"
            activeClassName="is-current-page"
            exit={{
              trigger: ({ node, e, exit, entry }: IPageTransitionProps) =>
                transitionStandard(),
              length: 1,
            }}
            entry={{
              delay: 1,
              trigger: ({ node, e, exit, entry }: IPageTransitionProps) => {
                exitTransition(node)
                closeOverlay()
              }
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
