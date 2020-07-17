import React from 'react'
import TextBlock from './blocks/TextBlock'
import ImageBlock from './blocks/ImageBlock'
import AnimationBlock from './blocks/AnimationBlock'

const RichArticle = ({ richArticle, siteUrl, classes = '' }) => {
  // checks the blockType from the matrix field and loads the appropriate component
  const checkBlockType = (blockType, block) => {
    switch (blockType) {
      case 'text':
        return <TextBlock block={block} />
      case 'fullWidthImage':
        return <ImageBlock block={block} siteUrl={siteUrl} />
      case 'animation':
        return <AnimationBlock block={block} />
      default:
        return null
    }
  }

  return richArticle ? (
    <article className={`c-rich-article ${classes}`}>
      {richArticle.map((block, index) => (
        <div
          className={`c-rich-article__block c-rich-article__block--${index}`}
          key={block.id}
        >
          {checkBlockType(block.typeHandle, block)}
        </div>
      ))}
    </article>
  ) : null
}
export default RichArticle
