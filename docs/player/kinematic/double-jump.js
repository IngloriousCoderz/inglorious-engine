import { character } from "@inglorious/game/behaviors/character.js"
import { clamped } from "@inglorious/game/behaviors/clamped.js"
import { modernControls } from "@inglorious/game/behaviors/controls/kinematic/modern.js"
import { fsm } from "@inglorious/game/behaviors/fsm.js"
import {
  controlsInstances,
  controlsTypes,
} from "@inglorious/game/behaviors/input/controls.js"
import { jumpable } from "@inglorious/game/behaviors/jumpable.js"

const Y = 1

export default {
  types: {
    ...controlsTypes(),

    stats: {},

    character: [
      character(),
      modernControls(),
      clamped(),
      jumpable({ maxJumps: 2 }),
      fsm({
        default: {
          update(instance) {
            stopFreeFalling(instance)
          },
        },

        jumping: {
          update(instance) {
            stopFreeFalling(instance)
          },
        },
      }),
    ],
  },

  instances: {
    ...controlsInstances("input0", {
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
    },
  },
}

function stopFreeFalling(instance) {
  if (instance.position[Y] <= 0) {
    instance.vy = 0
    instance.position[Y] = 0
    instance.state = "default"
    instance.jumpsLeft = 2
  }
}
