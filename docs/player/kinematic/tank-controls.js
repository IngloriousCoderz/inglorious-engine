import { character } from "@inglorious/game/behaviors/character.js"
import { clamped } from "@inglorious/game/behaviors/clamped"
import { tankControls } from "@inglorious/game/behaviors/controls/kinematic/tank.js"
import {
  controlsInstances,
  controlsTypes,
} from "@inglorious/game/behaviors/input/controls.js"

export default {
  types: {
    ...controlsTypes(),

    character: [character(), tankControls(), clamped()],
  },

  instances: {
    ...controlsInstances("input0", {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right",
      Btn12: "up",
      Btn13: "down",
      Btn14: "left",
      Btn15: "right",
      Axis0: "strafe",
      Axis1: "upDown",
      Axis2: "leftRight",
    }),

    character: {
      type: "character",
      maxAngularSpeed: 10,
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
