const DEFAULT_SIZE = 16
const DEFAULT_PADDING = 0

export function renderText(entity, ctx) {
  const {
    size = DEFAULT_SIZE,
    lineHeight = size,
    color = "black",
    font = "sans-serif",
    textAlign = "left",
    value = "",
  } = entity

  ctx.save()

  ctx.font = `${size}px ${font}`
  ctx.fillStyle = color
  ctx.textAlign = textAlign

  const tokens = value.split("\n")
  tokens.forEach((token, index) => {
    ctx.fillText(token, DEFAULT_PADDING, size + lineHeight * index)
  })

  ctx.restore()
}
