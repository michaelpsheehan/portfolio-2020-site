import Section from '../core/Section'
import React from 'react'

const SplitSection = ({primarySection, secondarySection, useContainer, backgroundColor, reversed, forwardedRef, classes = ''}) => {

  const content = <div  classes={` ${backgroundColor !== null ? backgroundColor : ''} ${classes}`}   ref={forwardedRef}>
  <div className={`c-split-section py-16 md:py-0 md:flex md:items-center md:h-screen  ${reversed ? 'md:flex-row-reverse' : ''} ${backgroundColor !== null ? 'js-dark-bg' : 'js-white-bg'} `}>
    <div className="c-split-section--primary md:h-full mb-8 md:mb-0 md:w-1/2 flex items-center ">
       {primarySection}
    </div>
    <div className={`c-split-section--secondary  md:h-full md:w-1/2 flex items-center text-center `}>
      {secondarySection}
    </div>
  </div>
</div>

  return(
  useContainer ? (
      <div className='container'>
      {content}
      </div>
    )
    : (content)
  )
}

export default SplitSection