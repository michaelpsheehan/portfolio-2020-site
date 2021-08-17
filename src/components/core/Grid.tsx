
import React, { useRef, useEffect } from 'react'
import staggerItemsIn from '../../animations/staggerItemsIn'
interface ItemDefaults {
  id: string
}

type Props<T> = {
  items: T[];
  itemTemplatePath:  (props: React.ComponentProps<any>) => JSX.Element;
  itemSection: string;
  siteUrl: string;
  classes?: string;
}

function Grid  <T extends ItemDefaults>(props: Props<T> ): JSX.Element {
  const { items, itemTemplatePath, itemSection, siteUrl, classes = '' } = props
  const Item = itemTemplatePath
  const gridContainerRef = useRef<HTMLDivElement | null >(null)

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null
    
    if(gridContainerRef?.current?.children )  {
      tl = staggerItemsIn(gridContainerRef.current.children, 'back.out(2)', 1)
    }

    return () => {
      tl?.kill()
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
