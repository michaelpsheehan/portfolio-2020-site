import React, {useEffect} from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import TransitionLink from 'gatsby-plugin-transition-link'
import {transitionStandard, exitTransition}  from '../components/core/transitions/TransitionCover'

import {

  useGlobalDispatchContext,
} from '../context/globalContext'

const MenuItem = ({ name, link, forwardedRef }) => {
  const dispatch = useGlobalDispatchContext()
const closeOverlay = ()=> {
  dispatch({
    type: 'CHANGE_OVERLAY',
    newStatus: 'closed',
  }) 

}

const interestingExitAnimation = (exit, node, e, entry) => {
  // console.log('exit animation call')
  // console.log('node -- ',node, )
  // console.log('e -- ',e, )
  // console.log('exit -- ',exit, )
  // console.log('entry -- ',entry, )
  // console.log('page enter',node, e, exit, entry)
transitionStandard()
}

const onPageEnter = (node, e, exit, entry ) => {
  
    // console.log('page enter',node, e, exit, entry)
    // console.log('page enter')
    // console.log('node -- ',node, )
    // console.log('e -- ',e, )
    // console.log('exit -- ',exit, )
    // console.log('entry -- ',entry, )
    exitTransition(node)
    closeOverlay()


}

  return (
  <li className="c-primary-nav__list-item">
    <span className="block overflow-hidden">
      <span className="block" ref={forwardedRef}>
<TransitionLink
  to={link}
  className="c-primary-nav__list-item-link"
  activeClassName="is-current-page"
  exit={{
    trigger: ({ node, e, exit, entry }) => interestingExitAnimation(exit, node, e, entry),
    length: 1
  }}
  entry={{
       delay: 1,
    trigger: ({ node, e, exit, entry }) => onPageEnter(node, e, exit, entry )
  }}

>
          {name}
</TransitionLink>
      </span>
    </span>
  </li>
)}

export default MenuItem
