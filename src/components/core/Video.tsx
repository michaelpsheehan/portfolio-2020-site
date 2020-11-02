import React from 'react'
import { Player, ControlBar, Shortcut } from 'video-react'
import useSiteUrl from '../../hooks/useSiteUrl'

interface VideoProps {
  videoUrl: string
  isAmbientVideo?: boolean
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  classes?: string
}

const Video: React.FC<VideoProps> = ({
  videoUrl,
  isAmbientVideo,
  autoPlay,
  loop,
  muted,
  classes = '',
}: VideoProps) => {
  const siteUrl: string = useSiteUrl()
  const videoSrc: string = siteUrl + videoUrl
  const newShortcuts: {} = [
    {
      //  disables fullscreen shortcut with the f key. Is used for background looping videos that should not be controllable
      keyCode: 70, // f
      handle: () => {},
    },
  ]

  const shortcutEl: JSX.Element = (
    <Shortcut clickable={false} dblclickable={false} shortcuts={newShortcuts} />
  )

  return (
    <Player
      className={`shadow-2xl ${classes}`}
      fluid
      playsInline
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
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
