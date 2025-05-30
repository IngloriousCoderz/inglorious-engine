import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableClampToBounds } from "@inglorious/game/decorators/clamp-to-bounds.js"
import { enableTankControls } from "@inglorious/game/decorators/controls/dynamic/tank.js"
import {
  createControls,
  enableControls,
} from "@inglorious/game/decorators/input/controls.js"

export default {
  types: {
    ...enableControls(),

    character: [enableCharacter(), enableTankControls(), enableClampToBounds()],
  },

  instances: {
    ...createControls("input0", {
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
      maxAcceleration: 500,
      maxSpeed: 250,
      friction: 250,
      position: [400, 0, 300],
    },
  },
}
