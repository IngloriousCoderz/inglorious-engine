import { seek } from "@inglorious/engine/ai/movement/dynamic/seek.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { renderMouse } from "@inglorious/ui/canvas/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, { entities }) {
          const { mouse, game } = entities

          merge(entity, seek(entity, mouse, dt))
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
