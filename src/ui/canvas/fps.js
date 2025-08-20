const DEFAULT_PADDING = 10
const ONE_SECOND = 1

export function renderFps(entity, ctx) {
  const { accuracy, size, value } = entity.dt

  ctx.save()

  ctx.font = `${size}px sans serif`
  ctx.fillStyle = "black"
  ctx.fillText(
    (ONE_SECOND / value).toFixed(accuracy),
    DEFAULT_PADDING,
    DEFAULT_PADDING + size,
  )

  ctx.restore()
}
