import { jumpable } from "@inglorious/engine/behaviors/physics/jumpable.js"
import { renderCircle } from "@inglorious/renderer-2d/shapes/circle.js"
import { renderRectangle } from "@inglorious/renderer-2d/shapes/rectangle.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    ball: [
      { render: renderCircle },
      jumpable(),
      (type) =>
        extend(type, {
          create(entity, entityId, api) {
            type.create?.(entity, entityId, api)

            if (entityId !== entity.id) return

            entity.jumpTriggered = false
          },

          update(entity, dt, api) {
            type.update?.(entity, dt, api)

            if (!entity.jumpTriggered) {
              api.notify("jump", entity.id)
              entity.jumpTriggered = true
            }
          },
        }),
    ],
    platform: [{ render: renderRectangle }],
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

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
      position: [400, 16, 0],
      size: [800, 32, 0],
      backgroundColor: "#654321",
      collisions: { platform: { shape: "rectangle" } },
    },
  },
}
