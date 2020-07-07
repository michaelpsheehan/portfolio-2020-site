import React from 'react'
import Section from '../../../core/Section'
import Text from '../../../core/Text'

const TextBlock = ({ block, classes = '' }) => (
  <Section
    content={<Text heading={block.heading} body={block.body} />}
    container
  />
)
export default TextBlock
