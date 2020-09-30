import React from 'react'
import Video from '../../../core/Video'

const VideoBlock = ({ block, classes = '' }) => {
  if(!block.video) {
    return
  }
  const videoUrl = block.video[0].url

  // console.log('video url ====', videoUrl)
 
  return (
    <div className="container">
      <Video videoUrl={videoUrl} playing loop muted />
    </div>
)}
export default VideoBlock