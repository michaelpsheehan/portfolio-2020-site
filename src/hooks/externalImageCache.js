let imageCache = {}

export const addImageToCache = (image) =>
  (imageCache = { ...imageCache, [image]: image })

export const checkImageCache = (image) => {
  if (imageCache[image]) {
    return imageCache[image]
  }
  addImageToCache(image)
}
export const printImageCache = () => imageCache
