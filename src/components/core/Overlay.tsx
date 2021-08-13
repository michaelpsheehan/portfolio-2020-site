import React from 'react'

interface Props {
  classes?: string
  children: any
}

const Overlay: React.FC<Props> = ({classes, children}: Props) => 
  <div className={`c-overlay ${classes}`}>{children}</div>


export default Overlay
