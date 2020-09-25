import React, { useRef, useEffect } from 'react'
import staggerItemsIn from '../../animations/staggerItemsIn'
const TechnologyList = ({ currentList }) => {
  const technologyListRef = useRef(null)

  useEffect(() => {
    const tl = staggerItemsIn(technologyListRef.current.children)
    return () => {
      tl.kill()
    }
  }, [])
  return (
    <div className="c-technologies">
      <div className="c-technologies__heading">Technologies Used</div>
      <div className="c-technologies__list" ref={technologyListRef}>
        {currentList &&
          currentList.map((ListItem) => (
            <div className="px-2  md:mb-1 md:mx-4" key={ListItem.id}>
              {ListItem.title}
            </div>
          ))}
      </div>
    </div>
  )
}
export default TechnologyList
