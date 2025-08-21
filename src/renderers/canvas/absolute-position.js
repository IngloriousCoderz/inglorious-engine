import { snap, zero } from "@inglorious/utils/math/linear-algebra/vector.js"

export function absolutePosition(render) {
  return (entity, ctx, options = {}) => {
    const { position = zero() } = entity
    const [x, y, z] = snap(position)

    const game = options.api.getEntity("game")
    const [, , , screenHeight] = game.bounds

    ctx.save()

    ctx.translate(x, screenHeight - y - z)
    render(entity, ctx, options)

    ctx.restore()
  }
}
