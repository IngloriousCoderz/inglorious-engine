import {
  createKeyboard,
  keyboard,
} from "@inglorious/engine/behaviors/input/keyboard.js"
import { modernMove } from "@inglorious/engine/movement/kinematic/modern.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const X = 0
const Z = 2

export default {
  types: {
    keyboard: [keyboard()],

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, { entities }) {
          const { keyboard0 } = entities

          entity.velocity = zero()

          if (keyboard0.left) {
            entity.velocity[X] = -entity.maxSpeed
          }
          if (keyboard0.down) {
            entity.velocity[Z] = -entity.maxSpeed
          }
          if (keyboard0.right) {
            entity.velocity[X] = entity.maxSpeed
          }
          if (keyboard0.up) {
            entity.velocity[Z] = entity.maxSpeed
          }

          merge(entity, modernMove(entity, dt))
        },
      },
    ],
  },

  entities: {
    keyboard0: createKeyboard("keyboard0", {
      ArrowLeft: "left",
      ArrowDown: "down",
      ArrowRight: "right",
      ArrowUp: "up",
    }),

    character: {
      type: "character",
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
