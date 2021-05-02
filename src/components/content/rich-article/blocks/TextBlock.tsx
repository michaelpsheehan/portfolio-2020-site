import React from 'react'
import Text from '../../../core/Text'
import { ITextBlock } from '../../../../types/types'

interface IProps {
    classes: string;
    block: ITextBlock
}

const TextBlock = ({ block, classes = '' }: IProps) => (
    <div className="container">
        <Text heading={block.heading} body={block.body} classes={classes} />
    </div>
)

export default TextBlock
