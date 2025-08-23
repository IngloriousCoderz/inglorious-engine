import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { shooterControls } from "@inglorious/engine/behaviors/controls/dynamic/shooter.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

const controls = setupControls()

export default {
  devMode: true,
  types: {
    ...controls.types,
    mouse: [{ render: renderMouse }, mouse()],

    character: [{ render: renderCharacter }, shooterControls(), clamped()],
  },

  entities: {
    mouse: {
      type: "mouse",
      position: [400, 0, 300],
    },

    ...controls.entities,
    ...controlsEntities("input0", {
      ArrowUp: "moveUp",
      ArrowDown: "moveDown",
      ArrowLeft: "moveLeft",
      ArrowRight: "moveRight",
      KeyW: "moveUp",
      KeyS: "moveDown",
      KeyA: "moveLeft",
      KeyD: "moveRight",
      Btn12: "moveUp",
      Btn13: "moveDown",
      Btn14: "moveLeft",
      Btn15: "moveRight",
      Axis0: "strafe",
      Axis1: "move",
      Axis2: "turn",
    }),

    character: {
      type: "character",
      associatedInput: "input0",
      maxAngularAcceleration: 1000,
      maxAngularSpeed: 2 * pi(),
      maxAcceleration: 500,
      maxSpeed: 250,
      friction: 250,
      position: [400, 0, 300],
    },
  },
}
