import React from 'react'
import Image from '../../../core/Image'
import { IFullWidthImageBlock } from '../../../../types/types'
import ConditionalWrapper from '../../../../utils/ConditionalWrapper'
import Container from '../../../core/Container'

interface IProps {
    classes?: string;
    block: IFullWidthImageBlock
}

const ImageBlock = ({ block, classes = '' }: IProps) => {

    const { constrainImage, image, imageCaption } = block
    
    if (!image) return null

    return (
        <ConditionalWrapper 
            condition={!!constrainImage} 
            wrapper={Container} 
            children={ 
                <Image
                    classes={classes}
                    image={image[0]?.optimizedImagesFullWidth}
                    alt={imageCaption?? ''}
                />
            } 
        />
    )
}

export default ImageBlock
