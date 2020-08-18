import React from 'react'

const TechnologyList = ({ currentList }) => (
  <div className="c-technologies">
    <div className="c-technologies__heading">Technologies Used</div>
    <div className="c-technologies__list">
      {currentList.map((ListItem) => (
        <div className="px-2 mb-1 mb:mx-4" key={ListItem.id}>
          {ListItem.title}
        </div>
      ))}
    </div>
  </div>
)

export default TechnologyList
