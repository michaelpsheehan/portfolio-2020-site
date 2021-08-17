import React, { useRef, useEffect } from 'react'
import AnimationBlock from './blocks/AnimationBlock'
import ImageBlock from './blocks/ImageBlock'
import TextBlock from './blocks/TextBlock'
import WebGLBlock from './blocks/WebGLBlock'
import VideoBlock from './blocks/VideoBlock'
import Section from '../../core/Section'
import { IRichArticleBlock } from '../../../types'
import { useLocation } from '@reach/router'


interface IProps {
  richArticle: any;
  isHomepage?: boolean
  classes?: string;
}

const RichArticle = ({ richArticle,  classes = '' }: IProps) => {
  
  // checks the blockType from the matrix field and loads the appropriate component
  const checkBlockType = (block: IRichArticleBlock) => {
    switch (block.typeHandle) {
      case 'text':
        return <TextBlock block={block} />
      case 'fullWidthImage':
        return <ImageBlock block={block} />
      case 'video':
        return <VideoBlock block={block} />
      case 'animation':
        return <AnimationBlock block={block} />
      case 'webgl':
        // return <WebGLBlock block={block} />
      default:
        return null
    }
  }

  const richArticleRef = useRef(null)
  const { pathname } = useLocation()

  let isHomepage = pathname === '/' ? true : false

  useEffect(()=>{
     isHomepage = pathname === '/' ? true : false 
  })


  return (
    richArticle && (
      <article className={`c-rich-article ${classes}`} ref={richArticleRef}>
        {richArticle?.map((block: IRichArticleBlock) => {
          console.log('rich article block ==== ', block)
          const currentBlock = checkBlockType( block)
          if(!currentBlock) return null
          const fullHeightSection =
             block.typeHandle === 'animation' || block.typeHandle === 'webgl'
              ? true
              : false

          let bgColor =
            block.backgroundColour && block.backgroundColour !== 'default'
              ? `${block.backgroundColour} js-dark-bg text-white`
              : 'bg-default js-white-bg'

          return (
            <Section
              content={currentBlock}
              key={block.id}
              isHomepage={isHomepage}
              classes={`${
                fullHeightSection ? 'c-section--screen-height' : ''
              } ${bgColor ? bgColor : ''}  `}
            />
          )
        })}
      </article>
    )
  )
}

export default RichArticle
