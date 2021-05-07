import React from 'react'
import Video from '../../../core/Video'
import { IVideoBlock } from '../../../../types/types'

interface IProps {
    classes?: string;
    block: IVideoBlock;
}

const VideoBlock = ({ block, classes = '' }: IProps) => {
    if (!block.video) return null

    const videoUrl = block.video[0].url
    const { isAmbientVideo } = block

    return (
        <div className="container">
            <Video
                classes={classes}
                videoUrl={videoUrl}
                autoPlay={isAmbientVideo}
                loop={isAmbientVideo}
                muted={isAmbientVideo}
                isAmbientVideo={isAmbientVideo}
            />
        </div>
    )
}
export default VideoBlock
