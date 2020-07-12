let imageCache = {}

export const addImageToCache = (image) =>
  (imageCache = { ...imageCache, [image]: image })

export const checkImageCache = (image) => imageCache[image]
export const printImageCache = () => imageCache
