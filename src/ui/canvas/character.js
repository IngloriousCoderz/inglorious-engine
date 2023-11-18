/* eslint-disable no-magic-numbers */

import circle from './circle.js'

const DEFAULT_OPTIONS = {}

export function type(type) {
  return {
    ...type,
    draw,
  }
}

export function instance(instance) {
  return {
    type: 'character',
    ...instance,
  }
}

function draw(ctx, options = DEFAULT_OPTIONS) {
  const { size = 24, orientation = 0 } = options.instance

  const radius = size * 0.5

  ctx.save()
  ctx.rotate(-orientation)
  ctx.translate(radius - 1, 0)

  ctx.fillStyle = 'black'

  ctx.beginPath()
  ctx.moveTo(0, 6)
  ctx.lineTo(0, -6)
  ctx.lineTo(6, 0)
  ctx.fill()
  ctx.closePath()
  ctx.restore()

  ctx.save()
  circle(ctx, { ...options, radius, fill: 'lightgrey' })
  ctx.restore()
}
