import React, { forwardRef } from 'react'

const ScrollIcon = ({ classes = '' }, ref) => (
  <div className={`c-scroll-icon ${classes}`} ref={ref} />
)
// forward ref is needed here so the parent component 'Hero.js' has access to this dom element for gsap to animate
const forwardScrollIcon = forwardRef(ScrollIcon)

export default forwardScrollIcon
