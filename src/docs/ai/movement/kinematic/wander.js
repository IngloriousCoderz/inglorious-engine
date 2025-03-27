import wander from "@inglorious/engine/ai/movement/kinematic/wander.js"
import { flip } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      enableCharacter(),
      (type) =>
        extend(type, {
          "game:update"(instance, event, { dt, instances }) {
            merge(instance, wander(instance, { dt }))
            flip(instance, instances.game.bounds)
          },
        }),
    ],
  },

  instances: {
    character: {
      id: "character",
      type: "character",
      maxSpeed: 250,
      maxAngularSpeed: pi() / 4,
      position: [400, 0, 300],
    },
  },
}
