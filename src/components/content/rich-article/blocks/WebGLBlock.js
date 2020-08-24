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
      <div className="max-w-sm mx-auto " >
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
  <div className="container">
    <SplitSection primarySection={textSection} secondarySection={webGLSection}   reversed={reversed} />
  </div>
    </div>
  
  )
}

export default webGLBlock
