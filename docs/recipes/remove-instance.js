import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { random } from "@inglorious/utils/math/rng.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [enableMouse()],

    character: [
      enableCharacter(),
      {
        // this event handler is needed in React
        instanceClick(instance, id, { notify }) {
          notify("instanceRemove", id)
        },
      },
    ],
  },

  instances: {
    mouse: {
      type: "mouse",
      position: [400, 0, 300],
      collisions: {
        hitbox: {
          shape: "circle",
          radius: 1,
        },
      },
    },

    ...Object.fromEntries(
      Array(5)
        .fill(null)
        .map((_, index) => [
          `character${index + 1}`,
          {
            type: "character",
            position: [random(0, 800), 0, random(0, 600)],
            orientation: random(0, 2 * pi(), 0.01),
            collisions: {
              hitbox: {
                shape: "circle",
                radius: 12,
              },
            },
          },
        ]),
    ),
  },
}
