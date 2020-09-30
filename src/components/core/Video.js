import React, {useEffect} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ReactPlayer from 'react-player/lazy'


const Video = ({ videoUrl, playing, loop, muted, classes = '' }) => {
  const { site } = useStaticQuery(query)
  const { siteUrl } = site.siteMetadata


console.log('vid render')
  return (
      <ReactPlayer className="c-video shadow-2xl" url={siteUrl + videoUrl }  playing={playing} loop={loop} muted={muted} width="100%" height="auto" />
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
