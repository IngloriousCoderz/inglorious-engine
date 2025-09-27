const DEFAULT_SIZE = 16
const DEFAULT_PADDING = 10
const LINE_NUMBER_OFFSET = 1

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

  const tokens = value.split("\n")
  tokens.forEach((token, index) => {
    ctx.fillText(
      token,
      padding,
      (padding + size) * (index + LINE_NUMBER_OFFSET),
    )
  })

  ctx.restore()
}
