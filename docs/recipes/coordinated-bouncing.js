import { Ticker } from "@inglorious/engine/animation/ticker.js"
import { jumpable } from "@inglorious/engine/behaviors/jumpable.js"
import { renderCircle } from "@inglorious/renderers/canvas/shapes/circle.js"
import { renderRectangle } from "@inglorious/renderers/canvas/shapes/rectangle.js"

export default {
  devMode: true,

  systems: [delayedJumpSystem],

  types: {
    ball: [{ render: renderCircle }, jumpable()],
    platform: [{ render: renderRectangle }],
  },

  entities: {
    ball1: {
      type: "ball",
      position: [200, 32, 0],
      size: [32, 32, 0],
      backgroundColor: "#393664",
      delayedJump: { delay: 0 },
      collisions: { platform: { shape: "circle", radius: 16 } },
    },

    ball2: {
      type: "ball",
      position: [400, 32, 0],
      size: [32, 32, 0],
      backgroundColor: "#643639",
      delayedJump: { delay: 0.5 },
      collisions: { platform: { shape: "circle", radius: 16 } },
    },

    ball3: {
      type: "ball",
      position: [600, 32, 0],
      size: [32, 32, 0],
      backgroundColor: "#366439",
      delayedJump: { delay: 1 },
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

function delayedJumpSystem(state, dt, api) {
  Object.values(state.entities)
    .filter(
      ({ delayedJump, groundObject }) =>
        delayedJump && !delayedJump.triggered && groundObject,
    )
    .forEach((entity) => {
      entity.delayedJump.speed = entity.delayedJump.delay

      Ticker.tick({
        target: entity.delayedJump,
        dt,
        onTick: (delayedJump) => {
          api.notify("jump", { entityId: entity.id })
          delayedJump.triggered = true
        },
      })
    })
}
