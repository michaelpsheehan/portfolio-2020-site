import React from 'react'

interface TextProps {
  heading?: string 
  body:  string 
  forwardedRef?: React.MutableRefObject<any>  
  classes?: string
}


const Text: React.FC<TextProps> = ({ heading, body, forwardedRef, classes = '' }: TextProps) => {
  return (
    <div className={`c-text ${classes}`} ref={forwardedRef}>
      <h2 className="c-text__heading">{heading}</h2>
      <div
        className="c-text__body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  )
}
export default Text
