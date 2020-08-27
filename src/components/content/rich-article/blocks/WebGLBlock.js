import React, { useState, useRef, useEffect } from 'react'
import SplitSection from '../../splitSection'
import Text from '../../../core/Text'
import WebGlBase from '../../../3d/WebGLBase'
import Button from '../../../core/Button'
import slideInOnScroll from '../../../../animations/slideInOnScroll'

const webGLBlock = ({ block, sectionColor, classes = '' }) => {
  const [userDefinedScale, setScale] = useState(1.5)
  const amountToChangeScaleBy = 0.5
const scrollContainerRef = useRef(null)
const webGLSectionRef = useRef(null)
const textSectionRef = useRef(null)
  let reversed = block.alignCanvas === 'Left' ? true : false

  block.backgroundColour && block.backgroundColour !== 'default'
    ? (backgroundColor = `js-dark-background text-white ${block.backgroundColour} `)
    : null

  const textSection = (block.heading || block.body) && (
    <div className={`max-w-sm   z-40 ${reversed ? 'mr-0' : ''} `}>
      <Text
        heading={block.heading}
        body={block.body}
        classes="c-text--animation"

        forwardedRef={textSectionRef}
      />
    </div>
  )
  const onEnterScroll = () => {
   console.log('scroll enter')
  }

const handleScaleIncrease = () => {
  setScale(userDefinedScale + amountToChangeScaleBy)
}
  
const handleScaleDecrease = () => {
  userDefinedScale <= amountToChangeScaleBy
                    ? null
                    : setScale(userDefinedScale - amountToChangeScaleBy)
}
  
  useEffect(() => {
      
    const tl = slideInOnScroll(
      scrollContainerRef.current,
      webGLSectionRef.current,
      textSectionRef.current,
      onEnterScroll
  
      )
      
  return ()=> {
    tl.kill()
    tl.scrollTrigger.kill()
  }
  }, [])


  const webGLSection = (
    <WebGlBase sceneName={block.selectedScene} userScale={userDefinedScale}  />
  )

  return (
    <div className={`c-webgl-block py-16 md:py-0 overflow-hidden `} ref={scrollContainerRef}>
      <div className={`c-webgl py-16 xl:py-0 xl:flex xl:items-center xl:h-screen  relative `} >
        <div className="container">
          <div className={`${reversed ? 'xl:flex xl:flex-row-reverse' : ''} `}>
            <div className="c-webgl--primary xl:h-full mb-8 xl:mb-0 xl:w-1/2 flex  items-center  z-40 ">
              {textSection}
            </div>
          </div>
        </div>
        <div
          className={`c-webgl--secondary  xl:h-full flex items-center text-center `}
          ref={webGLSectionRef} 
        >
          {webGLSection}
        </div>
      </div>
      <div className="container relative">
        <div className="c-scale-model">
          <div className="c-scale-model__title">zoom</div>
          <div className="c-scale-model__buttons">
            <div
              onClick={() => handleScaleIncrease()}
              className="c-scale-model__button"
            >
              +
            </div>
            {userDefinedScale > 0.25 && (
              <div
                onClick={() => handleScaleDecrease()
                }
                className="c-scale-model__button"
              >
                -
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default webGLBlock
