import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { shooterControls } from "@inglorious/engine/behaviors/controls/dynamic/shooter.js"
import {
  controlsInstances,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { renderMouse } from "@inglorious/ui/canvas/mouse.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    ...controlsTypes(),

    character: [{ render: renderCharacter }, shooterControls(), clamped()],
  },

  instances: {
    mouse: {
      type: "mouse",
      position: [400, 0, 300],
    },

    ...controlsInstances("input0", {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right",
    }),

    character: {
      type: "character",
      maxAngularAcceleration: 1000,
      maxAngularSpeed: 2 * pi(),
      maxAcceleration: 500,
      maxSpeed: 250,
      friction: 250,
      position: [400, 0, 300],
    },
  },
}
