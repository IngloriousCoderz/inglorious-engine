/* eslint-disable no-magic-numbers */
import { ZERO_VECTOR } from '@inglorious/utils/math/linear-algebra/vector.js'

const DEFAULT_OPTIONS = {}

export function absolutePosition(draw) {
  return (ctx, options = DEFAULT_OPTIONS) => {
    const { config, instance } = options
    const [, , , screenHeight] = config.bounds
    const { position = ZERO_VECTOR, py = 0 } = instance
    const [x, , z] = position

    ctx.save()
    ctx.translate(x, screenHeight - py - z)
    draw(ctx, options)
    ctx.restore()
  }
}
