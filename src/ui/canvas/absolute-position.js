import { snap, zero } from "@inglorious/utils/math/linear-algebra/vector.js"

export function absolutePosition(draw) {
  return (ctx, instance, options = {}) => {
    const { position = zero() } = instance
    const { instances } = options
    const [, , , screenHeight] = instances.game.bounds
    const [x, y, z] = snap(position)

    ctx.save()

    ctx.translate(x, screenHeight - y - z)
    draw(ctx, instance, options)

    ctx.restore()
  }
}
