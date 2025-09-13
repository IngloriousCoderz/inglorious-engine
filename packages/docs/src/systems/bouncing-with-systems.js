import { Ticker } from "@inglorious/engine/animation/ticker.js"
import { jumpable } from "@inglorious/engine/behaviors/physics/jumpable.js"
import { renderCircle } from "@inglorious/renderer-2d/shapes/circle.js"
import { renderRectangle } from "@inglorious/renderer-2d/shapes/rectangle.js"

export default {
  systems: [delayedJumpSystem()],

  types: {
    ball: [{ render: renderCircle }, jumpable()],
    platform: [{ render: renderRectangle }],
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

    ball1: {
      type: "ball",
      position: [200, 64, 0],
      backgroundColor: "#393664",
      maxJump: 250,
      delayedJump: { delay: 0 },
      collisions: { platform: { shape: "circle", radius: 16 } },
    },

    ball2: {
      type: "ball",
      position: [400, 64, 0],
      backgroundColor: "#643639",
      maxJump: 250,
      delayedJump: { delay: 0.5 },
      collisions: { platform: { shape: "circle", radius: 16 } },
    },

    ball3: {
      type: "ball",
      position: [600, 64, 0],
      backgroundColor: "#366439",
      maxJump: 250,
      delayedJump: { delay: 1 },
      collisions: { platform: { shape: "circle", radius: 16 } },
    },

    ground: {
      type: "platform",
      position: [400, 24, 0],
      size: [800, 48, 0],
      backgroundColor: "#654321",
      collisions: { platform: { shape: "rectangle" } },
    },
  },
}

function delayedJumpSystem() {
  return {
    update(state, dt, api) {
      Object.values(state.entities)
        .filter(({ delayedJump, groundObject }) => delayedJump && groundObject)
        .forEach((entity) => {
          entity.delayedJump.speed = entity.delayedJump.delay

          Ticker.tick({
            target: entity.delayedJump,
            dt,
            onTick: () => {
              api.notify("jump", entity.id)
            },
          })
        })
    },
  }
}
