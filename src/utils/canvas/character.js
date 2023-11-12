/* eslint-disable no-magic-numbers */

import circle from './circle.js'

const DEFAULT_OPTIONS = {}

export default function draw(ctx, options = DEFAULT_OPTIONS) {
  const { size = 24, orientation = 0 } = options

  const radius = size * 0.5

  ctx.resetTransform()

  circle(ctx, { ...options, radius, fill: 'lightgrey' })

  ctx.rotate(-orientation)
  ctx.translate(radius - 1, 0)

  ctx.fillStyle = 'black'

  ctx.beginPath()
  ctx.moveTo(0, 6)
  ctx.lineTo(0, -6)
  ctx.lineTo(6, 0)
  ctx.fill()
  ctx.closePath()
}
