import React from 'react'
import Video from '../../../core/Video'

const VideoBlock = ({ block, classes = '' }) => {
  if (!block.video) {
    return
  }

  const videoUrl = block.video[0].url
  const {isAmbientVideo} = block
  console.log('is ambient video ===', block.isAmbientVideo)

  return (
    <div className="container">
      <Video videoUrl={videoUrl} autoPlay={isAmbientVideo} loop={isAmbientVideo} muted={isAmbientVideo} isAmbientVideo={isAmbientVideo} />
    </div>
  )
}
export default VideoBlock
