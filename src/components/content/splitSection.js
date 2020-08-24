import Section from '../core/Section'
import React from 'react'

const SplitSection = ({primarySection, secondarySection, useContainer, backgroundColor, reversed, classes = ''}) => {

  return(
  
  <Section
  classes={`md:my-0 overflow-hidden ${backgroundColor !== null ? backgroundColor : ''} ${classes}`}

  content={
  <div className={`c-split-section py-16 md:py-0 md:flex md:items-center md:h-screen  ${
      reversed ? 'md:flex-row-reverse' : ''
    } 
    ${backgroundColor !== null ? 'js-dark-bg' : 'js-white-bg'} 
    `
  }
  >
    <div className="c-split-section--primary mb-8 md:mb-0 md:w-1/2">
    
       {primarySection}
  
 
    </div>
    <div
      className={`c-split-section--secondary md:w-1/2  text-center `}
    >

      {secondarySection}
    </div>
  </div>

  
}
container={useContainer}
/>

  )
}

export default SplitSection