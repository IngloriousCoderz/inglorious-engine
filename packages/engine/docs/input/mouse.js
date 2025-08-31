import { createMouse, mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, api) {
          const mouse = api.getEntity("mouse")
          entity.position = mouse.position
        },
      },
    ],
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

    mouse: createMouse("mouse", { position: [400, 0, 300] }),

    character: {
      type: "character",
      velocity: [0, 0, 0],
      position: [400, 0, 300],
    },
  },
}
