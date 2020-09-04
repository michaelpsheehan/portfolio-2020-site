import React, {useRef, useEffect} from 'react'
import { gsap } from 'gsap'
const staggerItemsIn = (items, currentEase) => {

  if(items) {
    let tl = gsap.timeline()
    .from(items, {
      y:100,
      opacity:0,
      ease: currentEase ? currentEase : 'Power2.out',
      stagger: {
        amount: 1,
      },
    } )
    return tl;
  }
}
const Grid = ({
  items,
  itemTemplatePath,
  itemSection,
  siteUrl,
  classes = '',
}) => {
  const Item = itemTemplatePath
  const gridContainerRef = useRef(null) 

  useEffect(()=> {
  const tl = staggerItemsIn(gridContainerRef.current.children, 'back.out(3.8)')

  return () => { 
    tl.kill()
  }

  },[])

  return (
    <div className={`c-grid ${classes}`} ref={gridContainerRef}>
      {items.map((item) => (
        <div className="c-grid__item" key={item.id}>
          <Item item={item} itemSection={itemSection} siteUrl={siteUrl} />
        </div>
      ))}
    </div>
  )
}

export default Grid
