import React from 'react'
import { Link } from 'gatsby'
import EntryCard from './EntryCard'

const Grid = ({ items, itemTemplatePath, itemSection, classes = '' }) => {
  console.log('grid items ==', items, 'item temp pah ===', itemTemplatePath)
  const Item = itemTemplatePath
  return (
    <div className="c-grid">
      {items.map((item) => (
        <div className="c-grid__item border" key={item.id}>
          <Item item={item} itemSection={itemSection} />
        </div>
      ))}
    </div>
  )
}

export default Grid

// <div className="c-grid__item" key={project.id}>
// <Link to={`/projects/${project.slug}`}>
//   <div className="border">
//     <div className="text-center">
//       <div className="block">{project.slug}</div>
//       <div className="block">{project.title}</div>
//       <div className="block">{project.introBody}</div>
//       <div className="block"> uri{project.uri}</div>
//       <div className="block">url{project.url}</div>
//     </div>
//   </div>
// </Link>
// </div>
