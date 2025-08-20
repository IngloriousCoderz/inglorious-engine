import wander from "@inglorious/engine/ai/movement/kinematic/wander.js"
import { flip } from "@inglorious/game/bounds.js"
import renderCharacter from "@inglorious/ui/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      { render: renderCharacter },
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
