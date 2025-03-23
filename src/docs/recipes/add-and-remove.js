import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { random } from "@inglorious/utils/math/rng.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [
      enableMouse(),
      {
        "scene:click"(instance, event, { instances, notify }) {
          const characters = Object.values(instances).filter(
            ({ type }) => type === "character"
          )
          const ids = characters.map(({ id }) => id)

          const maxId = ids.length
            ? Number(ids[ids.length - 1].replace("character", ""))
            : 0

          notify({
            id: "instance:add",
            payload: {
              id: `character${maxId + 1}`,
              type: "character",
              position: event.payload,
              orientation: random(0, 2 * pi(), 0.01),
            },
          })
        },
      },
    ],

    character: [
      enableCharacter(),
      {
        hitbox: {
          shape: "circle",
          radius: 12,
        },

        // this event handler is needed for React
        "instance:click"(instance, event, { notify }) {
          notify({ id: "instance:remove", payload: event.payload })
        },
      },
    ],
  },

  instances: {
    mouse: { id: "mouse", type: "mouse", position: [400, 0, 300] },
  },
}
