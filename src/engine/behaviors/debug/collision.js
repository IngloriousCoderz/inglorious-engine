import { renderHitmask } from "@inglorious/ui/canvas/image/hitmask.js"
import { renderCircle } from "@inglorious/ui/canvas/shapes/circle.js"
import { renderRectangle } from "@inglorious/ui/canvas/shapes/rectangle.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

const Shape = {
  circle: renderCircle,
  rectangle: renderRectangle,
  platform: renderRectangle,
  hitmask: renderHitmask,
}

export function collisionGizmos() {
  return (type) =>
    extend(type, {
      render(entity, ctx, options) {
        type.render(entity, ctx, options)

        const { game } = options.entities
        if (!game.debug) {
          return
        }

        ctx.save()

        Object.values(entity.collisions).forEach((collision) => {
          const render = Shape[collision.shape]
          render({ ...entity, ...collision, color: "#00FF00" }, ctx, options)
        })

        ctx.restore()
      },
    })
}
