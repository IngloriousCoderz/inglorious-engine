import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { modernMove } from "@inglorious/engine/movement/kinematic/modern.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const X = 0
const Z = 2

export default {
  types: {
    ...controlsTypes(),

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, { api }) {
          const input0 = api.getEntity("input0")

          entity.velocity = zero()

          if (input0.left) {
            entity.velocity[X] = -entity.maxSpeed
          }
          if (input0.down) {
            entity.velocity[Z] = -entity.maxSpeed
          }
          if (input0.right) {
            entity.velocity[X] = entity.maxSpeed
          }
          if (input0.up) {
            entity.velocity[Z] = entity.maxSpeed
          }

          merge(entity, modernMove(entity, dt))
        },
      },
    ],
  },

  entities: {
    ...controlsEntities("input0", {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right",
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
