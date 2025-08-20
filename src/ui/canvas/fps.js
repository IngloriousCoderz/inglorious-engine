const DEFAULT_PADDING = 10
const ONE_SECOND = 1

export function renderFps(instance, ctx) {
  const { accuracy, size, value } = instance.dt

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
