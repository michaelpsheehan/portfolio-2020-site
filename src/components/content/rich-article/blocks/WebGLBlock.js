import React from 'react'
import SplitSection from '../../splitSection'
import Text from '../../../core/Text'
import WebGlBase from '../../../3d/WebGLBase'

const webGLBlock = ({ block, sectionColor, classes = '' }) => {
  console.log('block --', block)
  let backgroundColor = null
let reversed = block.alignCanvas === 'Left' ? true : false;

  if(block.backgroundColour)  {
    console.log('block  color ---', block.backgroundColour)
    backgroundColor = block.backgroundColour !== 'default' ? `js-dark-background text-white ${block.backgroundColour}` : block.backgroundColour
  }
  console.log('bg color ---', backgroundColor)
  
  

const textSection =   (block.heading || block.body) && (
      <div className={`max-w-sm mx-auto   ${reversed ? 'mr-0' : '' } `} >
        <Text
          heading={block.heading}
          body={block.body}
          classes="c-text--animation"

          // forwardedRef={textEl}
        />
     
  </div>
)



const webGLSection = <WebGlBase sceneName={block.selectedScene} />

  return (
    <div className={`c-webgl-block ${backgroundColor ? backgroundColor : ''}`} >
  {/* <div className="container relative"> */}


  <div className={`c-webgl py-16 xl:py-0 xl:flex xl:items-center xl:h-screen  relative ${backgroundColor !== null ? 'js-dark-bg' : 'js-white-bg'} `}>
   <div className="container">
     <div className={`${reversed ? 'xl:flex xl:flex-row-reverse' : '' } `} >
    <div className="c-webgl--primary xl:h-full mb-8 xl:mb-0 xl:w-1/2 flex  items-center  ">
       {textSection}
     </div>
    </div>
   </div>
    <div className={`c-webgl--secondary  xl:h-full flex items-center text-center `} >
      {webGLSection}
    </div>
  </div>
{/* </div> */}
    {/* <SplitSection primarySection={textSection} secondarySection={webGLSection}   reversed={reversed} /> */}
  {/* </div> */}
    </div>
  
  )
}

export default webGLBlock
