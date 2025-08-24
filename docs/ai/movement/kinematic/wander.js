import { wander } from "@inglorious/engine/ai/movement/kinematic/wander.js"
import { flip } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  devMode: true,
  types: {
    character: [
      {
        render: renderCharacter,
        update(entity, dt, api) {
          const game = api.getEntity("game")

          merge(entity, wander(entity, dt))
          flip(entity, game.bounds)
        },
      },
    ],
  },

  entities: {
    character: {
      type: "character",
      maxSpeed: 250,
      maxAngularSpeed: pi() / 4,
      position: [400, 0, 300],
    },
  },
}
