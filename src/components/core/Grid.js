import React from 'react'
import { Link } from 'gatsby'

const Grid = ({
  items,
  itemTemplatePath,
  itemSection,
  siteUrl,
  classes = '',
}) => {
  const Item = itemTemplatePath
  return (
    <div className="c-grid">
      {items.map((item) => (
        <div className="c-grid__item" key={item.id}>
          <Item item={item} itemSection={itemSection} siteUrl={siteUrl} />
        </div>
      ))}
    </div>
  )
}

export default Grid
