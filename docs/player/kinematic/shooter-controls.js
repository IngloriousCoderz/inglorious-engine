import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { shooterControls } from "@inglorious/engine/behaviors/controls/kinematic/shooter.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    ...controlsTypes(),

    character: [{ render: renderCharacter }, shooterControls(), clamped()],
  },

  entities: {
    mouse: {
      type: "mouse",
      position: [400, 0, 300],
    },

    ...controlsEntities("input0", {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowDown: "down",
      ArrowUp: "up",
      KeyA: "left",
      KeyD: "right",
      KeyS: "down",
      KeyW: "up",
    }),

    character: {
      type: "character",
      maxAngularSpeed: 2 * pi(),
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
