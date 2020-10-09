import React, { useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Player, ControlBar, Shortcut } from 'video-react'

const Video = ({
  videoUrl,
  isAmbientVideo,
  autoPlay,
  loop,
  muted,
  classes = '',
}) => {
  const { site } = useStaticQuery(query)
  const { siteUrl } = site.siteMetadata
  const videoSrc = siteUrl + videoUrl
  const videoRef = useRef(null)
  const newShortcuts = [
    {
      //  disables fullscreen shorcut with the f key. Is used for background looping videos that should not be controllable
      keyCode: 70, // f
      handle: () => {},
    },
  ]

  const shortcutEl = (
    <Shortcut clickable={false} dblclickable={false} shortcuts={newShortcuts} />
  )

  return (
    <Player
      fluid
      playsInline
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      // preload="auto"
      className="shadow-2xl"
      width="100%"
      height="auto"
    >
      <source src={videoSrc} />
      <ControlBar disabled={isAmbientVideo} />
      {isAmbientVideo && shortcutEl}
    </Player>
  )
}
export default Video

const query = graphql`
  query videoQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
