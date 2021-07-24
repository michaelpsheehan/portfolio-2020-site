const mergeEntries = (featuredEntries, allEntries) => {
  
  const featEntIds = featuredEntries.map((el) => el.id)
  let featuredEntriesFull = []
  let standardEntries = []
  // create an array of non featured entries
  allEntries.map((el) =>
    !featEntIds.includes(el.id)
      ? (standardEntries = [...standardEntries, el])
      : null
  )
  // create an array of the full featured entries. The FeaturedEntries passed as props from the GraphQl query only contains some of the project data not everything needed. This loop populates the full Featured projects array
  featEntIds.map((el) => {
    for (let currentEl of allEntries) {
      if (currentEl.id === el) {
        featuredEntriesFull = [...featuredEntriesFull, currentEl]
        break
      }
    }
  })

  // merge the final array of projects so the featured entries are always in the correct order according to the CMS feat entries. The standard entries are added underneath in date order
  const finishedEntries = [...featuredEntriesFull, ...standardEntries]
  return finishedEntries
}

export default mergeEntries
