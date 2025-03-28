import { snap, zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const NO_JUMP = 0

export function absolutePosition(draw) {
  return (ctx, instance, options = {}) => {
    const { position = zero(), py = NO_JUMP } = instance
    const { instances } = options
    const [, , , screenHeight] = instances.game.bounds
    const [x, y, z] = snap(position)

    ctx.save()

    ctx.translate(x, screenHeight - y - py - z)
    draw(ctx, instance, options)

    ctx.restore()
  }
}
