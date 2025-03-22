import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableClampToBounds } from "@inglorious/game/decorators/clamp-to-bounds.js"
import { enableShooterControls } from "@inglorious/game/decorators/controls/dynamic/shooter.js"
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
        id: "character",
        type: "character",
        maxAngularAcceleration: 1000,
        maxAngularSpeed: 2 * pi(),
        maxAcceleration: 500,
        maxSpeed: 250,
        friction: 250,
        position: [400, 0, 300],
      },
    },
  },
}
