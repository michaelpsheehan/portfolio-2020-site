import React, { useRef, useEffect } from 'react'
import staggerItemsIn from '../../animations/staggerItemsIn'

interface Props {
  items: any
  itemTemplatePath
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

  useEffect(() => {
    const tl = staggerItemsIn(
      gridContainerRef.current.children,
      'back.out(2)',
      1
    )

    return () => {
      tl.kill()
    }
  }, [])

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
