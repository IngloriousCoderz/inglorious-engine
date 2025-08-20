import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { renderMouse } from "@inglorious/ui/canvas/mouse.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, { entities }) {
          const { mouse } = entities
          entity.position = mouse.position
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
      velocity: [0, 0, 0],
      position: [400, 0, 300],
    },
  },
}
