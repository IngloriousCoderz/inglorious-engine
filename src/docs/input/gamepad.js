import move from "@inglorious/engine/movement/kinematic/modern.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import {
  createGamepad,
  enableGamepad,
} from "@inglorious/game/decorators/input/gamepad.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const X = 0
const Z = 2

export default {
  types: {
    gamepad: [enableGamepad()],

    character: [
      enableCharacter(),
      {
        "game:update"(instance, event, options) {
          const { gamepad0 } = options.instances

          instance.velocity = zero()

          if (gamepad0.left) {
            instance.velocity[X] = -instance.maxSpeed
          }
          if (gamepad0.down) {
            instance.velocity[Z] = -instance.maxSpeed
          }
          if (gamepad0.right) {
            instance.velocity[X] = instance.maxSpeed
          }
          if (gamepad0.up) {
            instance.velocity[Z] = instance.maxSpeed
          }

          if (gamepad0.leftRight != null) {
            instance.velocity[X] += gamepad0.leftRight * instance.maxSpeed
          }
          if (gamepad0.upDown != null) {
            instance.velocity[Z] += -gamepad0.upDown * instance.maxSpeed
          }

          merge(instance, move(instance, options))
        },
      },
    ],
  },

  instances: {
    gamepad0: createGamepad("gamepad0", {
      Btn12: "up",
      Btn13: "down",
      Btn14: "left",
      Btn15: "right",
      Axis0: "leftRight",
      Axis1: "upDown",
    }),

    character: {
      type: "character",
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
