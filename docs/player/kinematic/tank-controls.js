import { clamped } from "@inglorious/engine/behaviors/clamped"
import { tankControls } from "@inglorious/engine/behaviors/controls/kinematic/tank.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"

export default {
  devMode: true,
  types: {
    ...controlsTypes(),

    character: [{ render: renderCharacter }, tankControls(), clamped()],
  },

  entities: {
    ...controlsEntities("input0", {
      ArrowUp: "moveForward",
      ArrowDown: "moveBackward",
      ArrowLeft: "turnLeft",
      ArrowRight: "turnRight",
      KeyW: "moveForward",
      KeyS: "moveBackward",
      KeyA: "turnLeft",
      KeyD: "turnRight",
      Btn12: "moveForward",
      Btn13: "moveBackward",
      Btn14: "turnLeft",
      Btn15: "turnRight",
      Axis0: "strafe",
      Axis1: "move",
      Axis2: "turn",
    }),

    character: {
      type: "character",
      associatedInput: "input0",
      maxAngularSpeed: 10,
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
