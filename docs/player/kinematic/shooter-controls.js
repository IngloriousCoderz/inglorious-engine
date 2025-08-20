import { clamped } from "@inglorious/game/behaviors/clamped.js"
import { shooterControls } from "@inglorious/game/behaviors/controls/kinematic/shooter.js"
import {
  controlsInstances,
  controlsTypes,
} from "@inglorious/game/behaviors/input/controls.js"
import { mouse } from "@inglorious/game/behaviors/input/mouse.js"
import renderCharacter from "@inglorious/ui/canvas/character.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [mouse()],

    ...controlsTypes(),

    character: [{ render: renderCharacter }, shooterControls(), clamped()],
  },

  instances: {
    mouse: {
      type: "mouse",
      position: [400, 0, 300],
    },

    ...controlsInstances("input0", {
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
