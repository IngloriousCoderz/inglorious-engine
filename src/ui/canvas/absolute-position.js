import { snap, zero } from "@inglorious/utils/math/linear-algebra/vector.js"

export function absolutePosition(render) {
  return (instance, ctx, options = {}) => {
    const { position = zero() } = instance
    const [x, y, z] = snap(position)

    const { game } = options.instances
    const [, , , screenHeight] = game.bounds

    ctx.save()

    ctx.translate(x, screenHeight - y - z)
    render(instance, ctx, options)

    ctx.restore()
  }
}
