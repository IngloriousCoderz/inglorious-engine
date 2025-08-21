import {
  createGamepad,
  gamepad,
} from "@inglorious/engine/behaviors/input/gamepad.js"
import { modernMove } from "@inglorious/engine/movement/kinematic/modern.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const X = 0
const Z = 2

export default {
  types: {
    gamepad: [gamepad()],

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, api) {
          const gamepad0 = api.getEntity("gamepad0")

          entity.velocity = zero()

          if (gamepad0.left) {
            entity.velocity[X] = -entity.maxSpeed
          }
          if (gamepad0.down) {
            entity.velocity[Z] = -entity.maxSpeed
          }
          if (gamepad0.right) {
            entity.velocity[X] = entity.maxSpeed
          }
          if (gamepad0.up) {
            entity.velocity[Z] = entity.maxSpeed
          }

          if (gamepad0.leftRight != null) {
            entity.velocity[X] += gamepad0.leftRight * entity.maxSpeed
          }
          if (gamepad0.upDown != null) {
            entity.velocity[Z] += -gamepad0.upDown * entity.maxSpeed
          }

          merge(entity, modernMove(entity, dt))
        },
      },
    ],
  },

  entities: {
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
