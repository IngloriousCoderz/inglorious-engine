import { snap, zero } from "@inglorious/utils/math/linear-algebra/vector.js"

export function absolutePosition(render) {
  return (entity, ctx, { api }) => {
    const { position = zero() } = entity
    const [x, y, z] = snap(position)

    const game = api.getEntity("game")
    const [, , , screenHeight] = game.bounds

    ctx.save()

    ctx.translate(x, screenHeight - y - z)
    render(entity, ctx, api)

    ctx.restore()
  }
}
