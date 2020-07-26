import React from 'react'
import Grid from './Grid'

const IndexPage = ({ featuredEntries, allEntries, classes = '' }) => {
  const finalEntries = allEntries
  // console.log('the featured entries ==', featuredEntries)
  // console.log('all  entries ==', allEntries)
  // let filteredEntries = null
  // if (featuredEntries) {
  //   filteredEntries = allEntries.forEach((el) =>
  //     featuredEntries.forEach((featEl) => (featEl.id !== el.id ? featEl : null))
  //   )

  // }
  // console.log('FILTERED  entries ==', filteredEntries)

  return <div className={`c-index-page ${classes}`} />
}
export default IndexPage
