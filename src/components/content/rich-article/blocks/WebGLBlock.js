import React from 'react'
import SplitSection from '../../splitSection'
import Text from '../../../core/Text'

const webGLBlock = ({ block, sectionColor, classes = '' }) => {
  console.log('block --', block)
  let backgroundColor = null
let reversed = block.alignCanvas === 'Left' ? true : false;
  block.backgroundColour && block.backgroundColour !== 'default'
  ?  backgroundColor = `js-dark-background text-white ${block.backgroundColour} `
  : null


console.log('bg color ==', backgroundColor)

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
const webGLSection = <div>secondarySection Section here</div>

  return (
    <SplitSection primarySection={textSection} secondarySection={webGLSection} useContainer backgroundColor={backgroundColor} reversed={reversed} />
  
  )
}

export default webGLBlock
