/* eslint-disable no-magic-numbers */

const DEFAULT_OPTIONS = {}

export default function draw(ctx, options = DEFAULT_OPTIONS) {
  const {
    width = 100,
    height = 50,
    color = 'black',
    backgroundColor = 'transparent',
  } = options

  ctx.lineWidth = 1
  ctx.strokeStyle = color
  ctx.fillStyle = backgroundColor

  ctx.beginPath()
  ctx.fillRect(0, 0, width, height)
  ctx.strokeRect(0, 0, width, height)
  ctx.stroke()
  ctx.closePath()
}
