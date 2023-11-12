/* eslint-disable no-magic-numbers */

const DEFAULT_OPTIONS = {}

export default function draw(ctx, options = DEFAULT_OPTIONS) {
  const { config, position } = options
  const [, , , screenHeight] = config.bounds
  const [x, , z] = position

  ctx.resetTransform()
  ctx.translate(x, screenHeight - z)

  ctx.strokeStyle = 'black'
  ctx.fillStyle = 'black'
  ctx.lineWidth = 1

  ctx.moveTo(-6, 0)
  ctx.lineTo(-3, 0)
  ctx.stroke()

  ctx.moveTo(4, 0)
  ctx.lineTo(7, 0)
  ctx.stroke()

  ctx.moveTo(0, -6)
  ctx.lineTo(0, -3)
  ctx.stroke()

  ctx.moveTo(0, 4)
  ctx.lineTo(0, 7)
  ctx.stroke()

  ctx.beginPath()
  ctx.fillRect(0, 0, 1, 1)
  ctx.closePath()
}
