/* eslint-disable no-magic-numbers */

import { pi } from '@inglorious/utils/math/trigonometry.js'

const DEFAULT_OPTIONS = {}

export default function draw(ctx, options = DEFAULT_OPTIONS) {
  const { radius = 24, stroke = 'black', fill = 'transparent' } = options

  ctx.lineWidth = 1
  ctx.strokeStyle = stroke
  ctx.fillStyle = fill

  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * pi())
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}
