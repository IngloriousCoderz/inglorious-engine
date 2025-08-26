import { jumpable } from "@inglorious/engine/behaviors/jumpable.js"
import { renderCircle } from "@inglorious/renderers/canvas/shapes/circle.js"
import { renderRectangle } from "@inglorious/renderers/canvas/shapes/rectangle.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

export default {
  devMode: true,

  types: {
    ball: [
      { render: renderCircle },
      jumpable(),
      (type) =>
        extend(type, {
          update(entity, dt, api) {
            type.update?.(entity, dt, api)

            if (entity.groundObject) {
              api.notify("jump", { entityId: entity.id })
            }
          },
        }),
    ],
    platform: [{ render: renderRectangle }],
  },

  entities: {
    ball1: {
      type: "ball",
      position: [200, 32, 0],
      size: [32, 32, 0],
      backgroundColor: "#393664",
      maxJump: 250,
      collisions: { platform: { shape: "circle", radius: 16 } },
    },

    ball2: {
      type: "ball",
      position: [400, 32, 0],
      size: [32, 32, 0],
      backgroundColor: "#643639",
      maxJump: 250,
      collisions: { platform: { shape: "circle", radius: 16 } },
    },

    ball3: {
      type: "ball",
      position: [600, 32, 0],
      size: [32, 32, 0],
      backgroundColor: "#366439",
      maxJump: 250,
      collisions: { platform: { shape: "circle", radius: 16 } },
    },

    ground: {
      type: "platform",
      position: [0, 0, 0],
      size: [800, 32, 0],
      backgroundColor: "#654321",
      collisions: { platform: { shape: "rectangle" } },
    },
  },
}
