import flee from "@inglorious/engine/ai/movement/kinematic/flee.js"
import { character } from "@inglorious/game/behaviors/character.js"
import { mouse } from "@inglorious/game/behaviors/input/mouse.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [mouse()],

    character: [
      character(),
      {
        update(instance, dt, { instances }) {
          const { mouse, game } = instances

          merge(instance, flee(instance, mouse, dt))
          clampToBounds(instance, game.bounds)
        },
      },
    ],
  },

  instances: {
    mouse: {
      type: "mouse",
      position: [400, 0, 300],
    },

    character: {
      type: "character",
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
