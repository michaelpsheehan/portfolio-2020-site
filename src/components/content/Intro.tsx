import React from 'react'
import Text from '../core/Text'
import Button from '../core/Button'

interface IntroProps {
  introHeading?: string
  introBody?: string
  viewSiteLink?: string
  viewCodeLink?: string
  classes?: string
}


const Intro: React.FC<IntroProps> = ({
  introHeading,
  introBody,
  viewSiteLink,
  viewCodeLink,
  classes = '',
}: IntroProps) => {
  
  
  return (

    <div className={`c-intro ${classes}`}>
      <Text heading={introHeading} body={introBody} />
      <div className="c-intro__buttons">
        {viewSiteLink && (
          <Button
            classes="mb-4 md:mb-0 "
            text="Visit Site"
            url={viewSiteLink}
            externalLink
          />
        )}
        {viewCodeLink && (
          <Button
            classes="mb-4 md:mb-0 "
            text="View Code"
            url={viewCodeLink}
            externalLink
          />
        )}
      </div>
    </div>
  )
}
export default Intro
