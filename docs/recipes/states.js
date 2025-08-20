import arrive from "@inglorious/engine/ai/movement/kinematic/arrive.js"
import wander from "@inglorious/engine/ai/movement/kinematic/wander.js"
import { character } from "@inglorious/game/behaviors/character.js"
import { fsm } from "@inglorious/game/behaviors/fsm.js"
import { mouse } from "@inglorious/game/behaviors/input/mouse.js"
import { clampToBounds, flip } from "@inglorious/game/bounds.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { length } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [mouse()],

    character: [
      character(),
      fsm({
        meandering: {
          update(instance, dt, { instances }) {
            const { mouse, game } = instances

            merge(instance, wander(instance, dt))
            flip(instance, game.bounds)

            if (length(subtract(instance.position, mouse.position)) < 200) {
              instance.state = "hunting"
            }
          },
        },

        hunting: {
          update(instance, dt, options) {
            const { mouse, game } = options.instances

            merge(instance, arrive(instance, mouse, dt, options))
            clampToBounds(instance, game.bounds)

            if (length(subtract(instance.position, mouse.position)) >= 200) {
              instance.state = "meandering"
            }
          },
        },
      }),
    ],
  },

  instances: {
    mouse: {
      type: "mouse",
      position: [0, 0, 0],
    },

    character: {
      type: "character",
      state: "meandering",
      maxSpeed: 250,
      maxAngularSpeed: pi() / 4,
      position: [400, 0, 300],
    },
  },
}
