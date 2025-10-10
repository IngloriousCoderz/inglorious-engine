export function images() {
  const imageCache = new Map()
  const loadingPromises = new Map()

  return {
    async init(entity) {
      const images = entity.images || {}

      await Promise.all(
        Object.entries(images).map(async ([id, { url }]) => {
          const img = await loadImage(url)
          img.id = id
          imageCache.set(id, img)
        }),
      )
    },

    async load(id, src) {
      if (imageCache.has(id)) {
        return imageCache.get(id)
      }

      if (loadingPromises.has(id)) {
        return loadingPromises.get(id)
      }

      const promise = loadImage(src).then((img) => {
        img.id = id
        imageCache.set(id, img)
        loadingPromises.delete(id)
        return img
      })

      loadingPromises.set(id, promise)
      return promise
    },

    get(id) {
      return imageCache.get(id)
    },

    stop() {
      imageCache.clear()
      loadingPromises.clear()
    },
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}
