import { snap, zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const NO_JUMP = 0

export function absolutePosition(draw) {
  return (ctx, options = {}) => {
    const { instances, position = zero(), py = NO_JUMP } = options
    const [, , , screenHeight] = instances.game.bounds
    const [x, , z] = snap(position)

    ctx.save()

    ctx.translate(x, screenHeight - py - z)
    draw(ctx, options)

    ctx.restore()
  }
}
