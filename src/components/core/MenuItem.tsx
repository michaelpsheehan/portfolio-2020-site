import React from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'
import {
  transitionStandard,
  exitTransition,
} from './transitions/TransitionCover'

import { useGlobalDispatchContext } from '../../context/globalContext'

import { IPageTransitionProps } from '../../types/types'

interface ITest {
  node: number;
  exit: any;
  e: any;
  entry: any;
}

interface IProps {

  name: string;
  link: string;
  forwardedRef: React.LegacyRef<HTMLSpanElement> | undefined;
}

const MenuItem = ({ name, link, forwardedRef }: IProps) => {
  console.log('forwarded red ============== ', forwardedRef)

  const dispatch = useGlobalDispatchContext()
  const closeOverlay = () => {
    dispatch({
      type: 'CHANGE_OVERLAY',
      newStatus: 'closed',
    })
  }

  const interestingExitAnimation = ({exit, node, e, entry}: IPageTransitionProps) => {
    console.log('exit == ', exit, typeof exit)
    console.log('node == ', node, typeof node)
    console.log('e == ', e, typeof e)
    console.log('entry == ', entry, typeof entry)
    transitionStandard()
  }

  const onPageEnter = ({node, e, exit, entry}: IPageTransitionProps) => {
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
              trigger: ({ node, e, exit, entry }: ITest) =>
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
