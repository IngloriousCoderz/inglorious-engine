export function draw(ctx, options) {
  const { instance } = options
  const { state } = instance

  ctx.save()

  if (state === 'pressed') {
    ctx.fillStyle = 'white'
  } else {
    ctx.fillStyle = 'black'
  }

  ctx.restore()
}
