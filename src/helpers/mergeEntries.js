const mergeEntries = ( featuredEntries, allEntries ) => {
  console.log('feat entries in merg ===', featuredEntries)
  const featEntIds = featuredEntries.map(el => el.id)
  let featuredEntriesFull = []
  let standardEntries = []
  // create an array of non featured entries
  allEntries.map(el => !featEntIds.includes(el.id) ? standardEntries = [...standardEntries, el] : null)
  featEntIds.map(el =>  {
    for (let currentEl of allEntries) {
      if (currentEl.id === el) {
        featuredEntriesFull = [...featuredEntriesFull, currentEl];
        break;
         } 
        }
        console.log('loop currentEl.id', currentEl)
      }
    )
  
    // merge the final array of projects so the featured entries are alwa
  const finishedEntries = [...featuredEntriesFull, ...standardEntries]
  return finishedEntries
}


export default mergeEntries
