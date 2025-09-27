const DEFAULT_SIZE = 16
const DEFAULT_PADDING = 10

export function renderText(entity, ctx) {
  const {
    size = DEFAULT_SIZE,
    padding = DEFAULT_PADDING,
    color = "black",
    font = "sans-serif",
    textAlign = "left",
    value = "",
  } = entity

  ctx.save()

  ctx.font = `${size}px ${font}`
  ctx.fillStyle = color
  ctx.textAlign = textAlign
  ctx.fillText(value, padding, padding + size)

  ctx.restore()
}
