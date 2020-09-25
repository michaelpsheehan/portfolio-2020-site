import React from 'react'
import Section from '../../../core/Section'
import Text from '../../../core/Text'

const TextBlock = ({ block, classes = '' }) => (
  <div className="container">
    <Text heading={block.heading} body={block.body} />
  </div>
)
export default TextBlock
