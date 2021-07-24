export const formatSrcset = (imageSrcset: string, siteUrl: string) => {
  if(!imageSrcset || !siteUrl) return;

  return imageSrcset
  .split(',')
  .map(currentSrc => `${siteUrl}${currentSrc.trim()}, `)
  .join()
} 