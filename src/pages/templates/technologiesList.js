import React from 'react'

const TechnologyList = ({ currentList }) => (
  <div className="flex justify-center flex-wrap">
    {currentList.map((ListItem) => (
      <div className="border px-4 mb-1">{ListItem.title}</div>
    ))}
  </div>
)

export default TechnologyList
