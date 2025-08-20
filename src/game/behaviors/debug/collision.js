import renderHitmask from "@inglorious/ui/canvas/image/hitmask.js"
import renderCircle from "@inglorious/ui/canvas/shapes/circle.js"
import renderRectangle from "@inglorious/ui/canvas/shapes/rectangle.js"
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
      render(instance, ctx, options) {
        type.render(instance, ctx, options)

        const { game } = options.instances
        if (!game.debug) {
          return
        }

        ctx.save()

        Object.values(instance.collisions).forEach((collision) => {
          const render = Shape[collision.shape]
          render({ ...instance, ...collision, color: "#00FF00" }, ctx, options)
        })

        ctx.restore()
      },
    })
}
