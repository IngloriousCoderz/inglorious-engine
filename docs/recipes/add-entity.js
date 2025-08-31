import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"
import { filter } from "@inglorious/utils/data-structures/object.js"
import { random } from "@inglorious/utils/math/rng.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [
      { render: renderMouse },
      mouse(),
      {
        mouseClick(entity, position, api) {
          const entities = api.getEntities()
          const characters = filter(
            entities,
            (_, { type }) => type === "character",
          )
          const ids = Object.keys(characters)

          api.notify("add", {
            id: `character${ids.length + 1}`,
            type: "character",
            position,
            orientation: random(0, 2 * pi(), 0.01),
          })
        },
      },
    ],

    character: [{ render: renderCharacter }],
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

    mouse: {
      type: "mouse",
      position: [400, 0, 300],
    },
  },
}
