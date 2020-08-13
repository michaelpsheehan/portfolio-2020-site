import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import {

  useGlobalDispatchContext,
} from '../context/globalContext'

const MenuItem = ({ name, link, forwardedRef }) => {
  const dispatch = useGlobalDispatchContext()
const closeMenu = ()=> {
console.log('close menu now')
  dispatch({
    type: 'CHANGE_OVERLAY',
    newStatus: 'closed',
  }) 

}
  return (
  <li className="c-primary-nav__list-item">
    <span className="block overflow-hidden">
      <span className="block" ref={forwardedRef}>
        <AniLink className="c-primary-nav__list-item-link" activeClassName="is-current-page"
        // cover direction='right' top="entry" entryOffset={80} bg="#663399" 

        cover
        direction="up"
        // duration={3}
        bg="#e3342f"
        // hex="#e3342f"

      
        // exit={{
        //   length: length,
        //   trigger: ({ exit, node }) =>
        //     // someCustomDefinedAnimation({ exit, node, direction: "out" }),
        //     ()=> console.log({ exit, node, direction: "out" }),
        // }}
        to={link} 
        // onExit={()=> console.log('on exit fired')}
        // exit={{
        //   trigger: ()=>  dispatch({
        //       type: 'CHANGE_OVERLAY',
        //       newStatus: 'closed',
        //     })}
        // }
        onClick={()=> closeMenu() 
    
    }
      
      
      >
          {name}
        </AniLink>
      </span>
    </span>
  </li>
)}

export default MenuItem
