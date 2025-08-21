import { flee } from "@inglorious/engine/ai/movement/dynamic/flee.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, api) {
          const mouse = api.getEntity("mouse")
          const game = api.getEntity("game")

          merge(entity, flee(entity, mouse, dt))

          clampToBounds(entity, game.bounds)
        },
      },
    ],
  },

  entities: {
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
