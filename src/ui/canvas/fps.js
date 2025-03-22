const DEFAULT_PADDING = 10
const ONE_SECOND = 1

export default function draw(ctx, options) {
  const { config, type, dt } = options
  const { accuracy, size } = config.types[type]

  ctx.font = `${size}px sans serif`
  ctx.fillStyle = 'black'
  ctx.fillText(
    (ONE_SECOND / dt.value).toFixed(accuracy),
    DEFAULT_PADDING,
    DEFAULT_PADDING + size
  )
}
