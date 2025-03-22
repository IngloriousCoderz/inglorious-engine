import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { random } from "@inglorious/utils/math/rng.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [
      enableMouse(),
      {
        "mouse:click"(instance, event, { instances, notify }) {
          const characters = Object.keys(instances)

          notify({
            id: "instance:add",
            payload: {
              id: `character${characters.length + 1}`,
              type: "character",
              position: event.payload,
              orientation: random(0, 2 * pi(), 0.01),
            },
          })
        },
      },
    ],

    character: [enableCharacter()],
  },

  state: {
    instances: {
      mouse: { id: "mouse", type: "mouse", position: [400, 0, 300] },
    },
  },
}
