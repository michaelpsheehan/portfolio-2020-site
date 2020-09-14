// import React from 'react'
// import Grid from './Grid'
// import EntryCard from '../core/EntryCard'
// import mergeEntries from '../../helpers/mergeEntries'
// const IndexPage = ({ featuredEntries, allEntries, classes = '', itemSection, itemTemplatePath, siteUrl }, ...props) => {
 
//  console.log('item section  ---', itemSection)
//  console.log('item template  ---', itemTemplatePath)
//  console.log('url  ---', siteUrl)
//   console.log('feat entries ---', featuredEntries)
//   const featEntIds = featuredEntries.map(el => el.id)
//   let standardEntries = []
  
//   // create an array of non featured entries
//   allEntries.map(el => !featEntIds.includes(el.id) ? standardEntries = [...standardEntries, el] : null)
 
//   // merge the final array of projects so the featured entries are alwa
//   const finishedEntries = [...featuredEntries, ...standardEntries]

//   console.log('standard entries', standardEntries)
//   console.log('finished entries', finishedEntries)
//   console.log('standardEntries ==', standardEntries)

//   return <div className={`c-index-page ${classes}`}>
//     {props.children}
//     {/* <Grid  
//       items={finishedEntries}
//       itemTemplatePath={itemTemplatePath}
//       itemSection={itemSection}
//       siteUrl={siteUrl}
//     /> */}
//     </div>
// }
// export default IndexPage
