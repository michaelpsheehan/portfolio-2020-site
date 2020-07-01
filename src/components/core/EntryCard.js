import React from 'react'
import { Link } from 'gatsby'

const EntryCard = ({ item, itemSection = '', classes = '' }) => {
  const { slug, title, introBody, uri, url } = item
  return (
    <div className={`c-entry-card ${classes}`}>
      <Link to={`${itemSection}/${slug}`}>
        <h2>{item && title}</h2>
        <div className="block">{slug}</div>
        <div className="block">{introBody}</div>
        <div className="block"> uri{uri}</div>
        <div className="block">url{url}</div>
      </Link>
    </div>
  )
}
export default EntryCard
