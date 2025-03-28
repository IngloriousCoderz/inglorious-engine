import arrive from "@inglorious/engine/ai/movement/kinematic/arrive.js"
import wander from "@inglorious/engine/ai/movement/kinematic/wander.js"
import { clampToBounds, flip } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { length } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [enableMouse()],

    character: [
      enableCharacter(),
      {
        states: {
          meandering: {
            "game:update"(instance, event, options) {
              const { instances } = options
              const target = instances.mouse

              merge(instance, wander(instance, options))
              flip(instance, instances.game.bounds)

              if (length(subtract(instance.position, target.position)) < 200) {
                instance.state = "hunting"
              }
            },
          },

          hunting: {
            "game:update"(instance, event, options) {
              const { instances } = options
              const target = instances.mouse

              merge(instance, arrive(instance, target, options))
              clampToBounds(instance, instances.game.bounds)

              if (length(subtract(instance.position, target.position)) >= 200) {
                instance.state = "meandering"
              }
            },
          },
        },
      },
    ],
  },

  instances: {
    mouse: {
      id: "mouse",
      type: "mouse",
      position: [0, 0, 0],
    },

    character: {
      id: "character",
      type: "character",
      state: "meandering",
      maxSpeed: 250,
      maxAngularSpeed: pi() / 4,
      position: [400, 0, 300],
    },
  },
}
