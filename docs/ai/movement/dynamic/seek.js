import seek from "@inglorious/engine/ai/movement/dynamic/seek.js"
import { mouse } from "@inglorious/game/behaviors/input/mouse.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import renderCharacter from "@inglorious/ui/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [mouse()],

    character: [
      { render: renderCharacter },
      {
        update(instance, dt, { instances }) {
          const { mouse, game } = instances

          merge(instance, seek(instance, mouse, dt))
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
      maxAcceleration: 1000,
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
