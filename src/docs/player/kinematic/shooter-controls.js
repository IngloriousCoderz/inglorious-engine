import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableClampToBounds } from "@inglorious/game/decorators/clamp-to-bounds.js"
import { enableShooterControls } from "@inglorious/game/decorators/controls/kinematic/shooter.js"
import {
  createControls,
  enableControls,
} from "@inglorious/game/decorators/input/controls.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [enableMouse()],

    ...enableControls(),

    character: [
      enableCharacter(),
      enableShooterControls(),
      enableClampToBounds(),
    ],
  },

  state: {
    instances: {
      mouse: { id: "mouse", type: "mouse", position: [400, 0, 300] },
      ...createControls(0, {
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
        id: "character",
        type: "character",
        maxAngularSpeed: 2 * pi(),
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
