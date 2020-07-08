import React from 'react'
import TextBlock from './blocks/TextBlock'
import ImageBlock from './blocks/ImageBlock'

const RichArticle = ({ richArticle, siteUrl, classes = '' }) => {
  // checks the blockType from the matrix field and loads the appropriate component
  const checkBlockType = (blockType, block) => {
    switch (blockType) {
      case 'text':
        return <TextBlock block={block} />
      case 'fullWidthImage':
        return <ImageBlock block={block} siteUrl={siteUrl} />
      default:
        return null
    }
  }

  return richArticle ? (
    <article className={`c-rich-article ${classes}`}>
      {richArticle.map((block, index) => (
        <div className="c-rich-article__block" key={block.id}>
          {checkBlockType(block.typeHandle, block)}
        </div>
      ))}
    </article>
  ) : null
}
export default RichArticle
