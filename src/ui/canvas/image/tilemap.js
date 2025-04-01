import imageDraw from "./image.js"

export default function draw(ctx, instance, options) {
  const { tilemap } = instance
  const { image, tiles } = tilemap
  const { tileSize, columns, scale } = image

  const [tileWidth, tileHeight] = tileSize

  ctx.save()

  tiles.forEach(([sx, sy], index) => {
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
