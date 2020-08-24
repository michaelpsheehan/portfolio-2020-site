import React, { Component, useRef, useEffect, createRef } from 'react'
import AnimationBlock from './blocks/AnimationBlock'
import ImageBlock from './blocks/ImageBlock'
import TextBlock from './blocks/TextBlock'
import WebGLBlock from './blocks/WebGLBlock'
import Section from '../../core/Section'

const RichArticle = ({richArticle, classes = '' }) => {
  // checks the blockType from the matrix field and loads the appropriate component
  const checkBlockType = (blockType, block) => {
    switch (blockType) {
      case 'text':
        return <TextBlock block={block} />
      case 'fullWidthImage':
        return <ImageBlock block={block} />
      case 'animation':
        return <AnimationBlock block={block} />
      case 'webgl':
        return <WebGLBlock block={block} />
      default:
        return null
    }
  }

  
return richArticle && (
  <article className={`c-rich-article ${classes}`}>
      {richArticle.map((block) => {
        const currentBlock =  checkBlockType(block.typeHandle, block, block.id);
        const fullHeightSection = block.typeHandle === 'animation' || block.typeHandle === 'webgl' ? true : false;
        return (
          <Section 
            content = {currentBlock}
            key={block.id}
            classes={fullHeightSection ? 'c-section--screen-height' : ''}
          />
        )}
      )}
  </article>
  ) 
}

export default RichArticle
