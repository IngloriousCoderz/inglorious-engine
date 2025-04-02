import imageDraw from "./image.js"

export default function draw(ctx, instance, options) {
  const { tilemap } = instance
  const { image, tiles } = tilemap
  const { imageSize, tileSize, columns, scale } = image

  const [imageWidth] = imageSize
  const [tileWidth, tileHeight] = tileSize
  const cols = imageWidth / tileWidth

  ctx.save()

  tiles.forEach((tile, index) => {
    const sx = tile % cols
    const sy = Math.floor(tile / cols)

    const dx = (index % columns) * tileWidth
    const dy = Math.floor(index / columns) * tileHeight

    ctx.save()
    ctx.scale(scale, scale)
    ctx.translate(dx, dy)

    imageDraw(ctx, { image, sx, sy }, options)
    ctx.restore()
  })

  ctx.restore()
}
