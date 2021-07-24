import React from 'react'
import useSiteUrl from '../../hooks/useSiteUrl'
import { IOptimizedImagesFullWidth } from '../../types/types'
import { formatSrcset } from '../../utils/utils'
require('lazysizes')
require('lazysizes/plugins/attrchange/ls.attrchange')

interface ImageProps {
    image: IOptimizedImagesFullWidth;
    classes?: string
    alt?: string
}

const Image = ({ image, alt = '', classes = '' }: ImageProps) => {
    const siteUrl: string = useSiteUrl()
    // formats the srcset from imageOptimize to work with gatsby by adding the craft backend url to the start of each src
    const formattedSrcset = formatSrcset(image.srcset, siteUrl)

    // const imageComponent: JSX.Element = 

       return <img
            className={`c-image shadow-2xl w-full lazyload ${classes}`}
            sizes="100vw"
            data-sizes="100vw"
            src={image?.placeholderImage}
            data-srcset={formattedSrcset}
            alt={alt}
        />

        // return imageComponent
}

export default Image
