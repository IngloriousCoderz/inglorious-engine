import { arrive } from "@inglorious/engine/ai/movement/kinematic/arrive.js"
import { wander } from "@inglorious/engine/ai/movement/kinematic/wander.js"
import { fsm } from "@inglorious/engine/behaviors/fsm.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { clampToBounds, flip } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { renderMouse } from "@inglorious/ui/canvas/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { length } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    character: [
      { render: renderCharacter },
      fsm({
        meandering: {
          update(entity, dt, { entities }) {
            const { mouse, game } = entities

            merge(entity, wander(entity, dt))
            flip(entity, game.bounds)

            if (length(subtract(entity.position, mouse.position)) < 200) {
              entity.state = "hunting"
            }
          },
        },

        hunting: {
          update(entity, dt, options) {
            const { mouse, game } = options.entities

            merge(entity, arrive(entity, mouse, dt, options))
            clampToBounds(entity, game.bounds)

            if (length(subtract(entity.position, mouse.position)) >= 200) {
              entity.state = "meandering"
            }
          },
        },
      }),
    ],
  },

  entities: {
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
