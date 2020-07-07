import React from 'react'
import Text from '../core/Text'
import Button from '../core/Button'

const Intro = ({
  introHeading,
  introBody,
  viewSiteLink,
  viewCodeLink,
  classes = '',
}) => (
  <div className={`c-intro ${classes}`}>
    <Text
      //  heading={introHeading}
      body={introBody}
    />
    <div className="c-intro__buttons">
      {viewSiteLink && (
        <Button text="Visit Site" url={viewSiteLink} externalLink />
      )}
      {viewCodeLink && (
        <Button text="View Code" url={viewCodeLink} externalLink />
      )}
    </div>
  </div>
)
export default Intro
