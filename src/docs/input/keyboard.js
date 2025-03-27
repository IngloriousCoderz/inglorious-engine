import move from "@inglorious/engine/movement/kinematic/modern.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import {
  createKeyboard,
  enableKeyboard,
} from "@inglorious/game/decorators/input/keyboard.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const X = 0
const Z = 2

export default {
  types: {
    keyboard: [enableKeyboard()],

    character: [
      enableCharacter(),
      (type) =>
        extend(type, {
          "game:update"(instance, event, options) {
            const { keyboard0 } = options.instances

            instance.velocity = zero()

            if (keyboard0.left) {
              instance.velocity[X] = -instance.maxSpeed
            }
            if (keyboard0.down) {
              instance.velocity[Z] = -instance.maxSpeed
            }
            if (keyboard0.right) {
              instance.velocity[X] = instance.maxSpeed
            }
            if (keyboard0.up) {
              instance.velocity[Z] = instance.maxSpeed
            }

            merge(instance, move(instance, options))
          },
        }),
    ],
  },

  instances: {
    keyboard0: createKeyboard("keyboard0", {
      ArrowLeft: "left",
      ArrowDown: "down",
      ArrowRight: "right",
      ArrowUp: "up",
    }),

    character: {
      id: "character",
      type: "character",
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
