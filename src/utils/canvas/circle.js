/* eslint-disable no-magic-numbers */
import { ZERO_VECTOR } from '@inglorious/utils/math/linear-algebra/vector.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

const DEFAULT_OPTIONS = {}

export default function draw(ctx, options = DEFAULT_OPTIONS) {
  const {
    config,
    position = ZERO_VECTOR,
    py = 0,
    radius = 24,
    stroke = 'black',
    fill = 'transparent',
  } = options
  const [, , , screenHeight] = config.bounds
  const [x, , z] = position

  ctx.translate(x, screenHeight - py - z)

  ctx.strokeStyle = stroke
  ctx.fillStyle = fill

  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * pi())
  ctx.stroke()
  ctx.fill()
  ctx.closePath()
}
