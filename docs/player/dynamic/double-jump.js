import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { modernControls } from "@inglorious/engine/behaviors/controls/dynamic/modern.js"
import { fsm } from "@inglorious/engine/behaviors/fsm.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { jumpable } from "@inglorious/engine/behaviors/jumpable.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"

const Y = 1

export default {
  types: {
    ...controlsTypes(),

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
    ...controlsEntities("input0", {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      Space: "jump",
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right",
      Btn12: "up",
      Btn13: "down",
      Btn14: "left",
      Btn15: "right",
      Btn0: "jump",
      Axis0: "leftRight",
      Axis1: "upDown",
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
      maxJumps: 2,
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
