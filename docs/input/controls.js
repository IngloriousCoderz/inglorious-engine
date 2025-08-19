import move from "@inglorious/engine/movement/kinematic/modern.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import {
  createControls,
  enableControls,
} from "@inglorious/game/decorators/input/controls.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const X = 0
const Z = 2

export default {
  types: {
    ...enableControls(),

    character: [
      enableCharacter(),
      {
        update(instance, dt, { instances }) {
          const { input0 } = instances
          instance.velocity = zero()

          if (input0.left) {
            instance.velocity[X] = -instance.maxSpeed
          }
          if (input0.down) {
            instance.velocity[Z] = -instance.maxSpeed
          }
          if (input0.right) {
            instance.velocity[X] = instance.maxSpeed
          }
          if (input0.up) {
            instance.velocity[Z] = instance.maxSpeed
          }

          merge(instance, move(instance, dt))
        },
      },
    ],
  },

  instances: {
    ...createControls("input0", {
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
