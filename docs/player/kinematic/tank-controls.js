import { clamped } from "@inglorious/engine/behaviors/clamped"
import { tankControls } from "@inglorious/engine/behaviors/controls/kinematic/tank.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"

export default {
  types: {
    ...controlsTypes(),

    character: [{ render: renderCharacter }, tankControls(), clamped()],
  },

  entities: {
    ...controlsEntities("input0", {
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
