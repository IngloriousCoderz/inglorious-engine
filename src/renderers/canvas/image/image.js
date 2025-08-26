const DEFAULT_POSITION = 0

export function renderImage(entity, ctx) {
  const { image, sx = DEFAULT_POSITION, sy = DEFAULT_POSITION } = entity
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
    const newImg = new Image()
    newImg.id = id
    newImg.style.display = "none"
    newImg.src = src
    document.body.appendChild(newImg)
  }

  ctx.restore()
}
