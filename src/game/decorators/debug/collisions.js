import drawHitmask from "@inglorious/ui/canvas/image/hitmask.js"
import drawCircle from "@inglorious/ui/canvas/shapes/circle.js"
import drawRectangle from "@inglorious/ui/canvas/shapes/rectangle.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

const Shape = {
  circle: drawCircle,
  rectangle: drawRectangle,
  hitmask: drawHitmask,
}

export function enableCollisionsDebug() {
  return (type) =>
    extend(type, {
      draw(ctx, instance, options) {
        type.draw(ctx, instance, options)

        if (!options.instances.game.debug) {
          return
        }

        ctx.save()

        Object.values(instance.collisions).forEach((collision) => {
          const draw = Shape[collision.shape]
          draw(ctx, { ...collision, color: "#00FF00" }, options)
        })

        ctx.restore()
      },
    })
}
