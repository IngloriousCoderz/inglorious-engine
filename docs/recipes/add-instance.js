import { character } from "@inglorious/game/behaviors/character.js"
import { mouse } from "@inglorious/game/behaviors/input/mouse.js"
import { filter } from "@inglorious/utils/data-structures/object.js"
import { random } from "@inglorious/utils/math/rng.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [
      mouse(),
      {
        mouseClick(instance, position, options) {
          const { instances, notify } = options
          const characters = filter(
            instances,
            (_, { type }) => type === "character",
          )
          const ids = Object.keys(characters)

          notify("add", {
            id: `character${ids.length + 1}`,
            type: "character",
            position,
            orientation: random(0, 2 * pi(), 0.01),
          })
        },
      },
    ],

    character: [character()],
  },

  instances: {
    mouse: {
      type: "mouse",
      position: [400, 0, 300],
    },
  },
}
