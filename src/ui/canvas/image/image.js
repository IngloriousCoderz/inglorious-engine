const DEFAULT_POSITION = 0

export function renderImage(instance, ctx) {
  const { image, sx = DEFAULT_POSITION, sy = DEFAULT_POSITION } = instance
  const { id, src, imageSize, tileSize = imageSize } = image

  const [tileWidth, tileHeight] = tileSize

  const imgParams = [
    sx * tileWidth,
    sy * tileHeight,
    tileWidth,
    tileHeight,
    DEFAULT_POSITION,
    DEFAULT_POSITION,
    tileWidth,
    tileHeight,
  ]

  ctx.save()

  const img = document.getElementById(id)
  if (img) {
    ctx.drawImage(img, ...imgParams)
  } else {
    const img = new Image()
    img.id = id
    img.style.display = "none"
    img.onload = () => {
      ctx.drawImage(img, ...imgParams)
    }
    img.src = src
    document.body.appendChild(img)
  }

  ctx.restore()
}
