import { extend } from "@inglorious/utils/data-structures/objects.js"

export function collisionGizmos(params) {
  return (type) =>
    extend(type, {
      render(entity, ctx, api) {
        type.render(entity, ctx, api)

        const game = api.getEntity("game")

        if (!game.debug) {
          return
        }

        if (!params?.shapes) {
          return
        }

        ctx.save()

        Object.values(entity.collisions).forEach((collision) => {
          const render = params.shapes[collision.shape]
          render?.({ ...entity, ...collision, color: "#00FF00" }, ctx, api)
        })

        ctx.restore()
      },
    })
}
