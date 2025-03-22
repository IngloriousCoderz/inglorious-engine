import { snap, zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const DEFAULT_OPTIONS = {}
const NO_JUMP = 0

export function absolutePosition(draw) {
  return (ctx, options = DEFAULT_OPTIONS) => {
    const { config, position = zero(), py = NO_JUMP } = options
    const [, , , screenHeight] = config.bounds
    const [x, , z] = snap(position)

    ctx.save()
    ctx.translate(x, screenHeight - py - z)
    draw(ctx, options)
    ctx.restore()
  }
}
