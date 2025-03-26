const DEFAULT_PADDING = 10
const ONE_SECOND = 1

export default function draw(ctx, options = {}) {
  const { types, type, dt } = options
  const { accuracy, size } = types[type]

  ctx.save()

  ctx.font = `${size}px sans serif`
  ctx.fillStyle = "black"
  ctx.fillText(
    (ONE_SECOND / dt.value).toFixed(accuracy),
    DEFAULT_PADDING,
    DEFAULT_PADDING + size,
  )

  ctx.restore()
}
