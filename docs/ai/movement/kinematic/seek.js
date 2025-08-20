import { seek } from "@inglorious/engine/ai/movement/kinematic/seek.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
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
          const { mouse } = entities

          merge(entity, seek(entity, mouse, dt))
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
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
