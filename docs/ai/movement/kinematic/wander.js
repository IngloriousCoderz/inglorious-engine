import wander from "@inglorious/engine/ai/movement/kinematic/wander.js"
import { character } from "@inglorious/game/behaviors/character.js"
import { flip } from "@inglorious/game/bounds.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      character(),
      {
        update(instance, dt, { instances }) {
          const { game } = instances

          merge(instance, wander(instance, dt))
          flip(instance, game.bounds)
        },
      },
    ],
  },

  instances: {
    character: {
      type: "character",
      maxSpeed: 250,
      maxAngularSpeed: pi() / 4,
      position: [400, 0, 300],
    },
  },
}
