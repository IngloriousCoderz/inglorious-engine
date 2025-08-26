import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import { fsm } from "@inglorious/engine/behaviors/fsm.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { jumpable } from "@inglorious/engine/behaviors/jumpable.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"

const Y = 1

const controls = setupControls()

export default {
  devMode: true,
  types: {
    ...controls.types,

    stats: {},

    character: [
      { render: renderCharacter },
      modernControls(),
      clamped(),
      jumpable({ maxJumps: 2 }),
      fsm({
        default: {
          update(entity) {
            stopFreeFalling(entity)
          },
        },

        jumping: {
          update(entity) {
            stopFreeFalling(entity)
          },
        },
      }),
    ],
  },

  entities: {
    ...controls.entities,
    ...controlsEntities("input0", ["character"], {
      ArrowUp: "moveUp",
      ArrowDown: "moveDown",
      ArrowLeft: "moveLeft",
      ArrowRight: "moveRight",
      Space: "jump",
      KeyW: "moveUp",
      KeyS: "moveDown",
      KeyA: "moveLeft",
      KeyD: "moveRight",
      Btn12: "moveUp",
      Btn13: "moveDown",
      Btn14: "moveLeft",
      Btn15: "moveRight",
      Btn0: "jump",
      Axis0: "moveLeftRight",
      Axis1: "moveUpDown",
    }),

    stats: {
      type: "stats",
      position: [600, 0, 600],
      target: "character",
    },

    character: {
      type: "character",
      maxSpeed: 250,
      position: [400, 0, 300],
      maxJump: 100,
      maxLeap: 100,
      collisions: {
        bounds: {
          shape: "circle",
          radius: 12,
        },
      },
    },
  },
}

function stopFreeFalling(entity) {
  if (entity.position[Y] <= 0) {
    entity.vy = 0
    entity.position[Y] = 0
    entity.state = "default"
    entity.jumpsLeft = 2
  }
}
