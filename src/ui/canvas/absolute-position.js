/* eslint-disable no-magic-numbers */
import {
  snap,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector.js'

const DEFAULT_OPTIONS = {}

export function absolutePosition(draw) {
  return (ctx, options = DEFAULT_OPTIONS) => {
    const { config } = options
    const [, , , screenHeight] = config.bounds
    const { position = ZERO_VECTOR, py = 0 } = options.instance
    const [x, , z] = snap(position)

    ctx.save()
    ctx.translate(x, screenHeight - py - z)
    draw(ctx, options)
    ctx.restore()
  }
}
