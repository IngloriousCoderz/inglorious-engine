const DEFAULT_SIZE = 16
const DEFAULT_PADDING = 10

export function renderText(entity, ctx) {
  const { size = DEFAULT_SIZE, value = "" } = entity

  ctx.save()

  ctx.font = `${size}px sans serif`
  ctx.fillStyle = "black"
  ctx.fillText(value, DEFAULT_PADDING, DEFAULT_PADDING + size)

  ctx.restore()
}
