import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { filter } from "@inglorious/utils/data-structures/object.js"
import { random } from "@inglorious/utils/math/rng.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [
      enableMouse(),
      {
        "scene:click"(instance, position, options) {
          const { instances, notify } = options
          const characters = filter(
            instances,
            (_, { type }) => type === "character",
          )
          const ids = Object.keys(characters)

          const maxId = ids.length
            ? Number(ids[ids.length - 1].replace("character", ""))
            : 0

          notify({
            id: "instance:add",
            payload: {
              id: `character${maxId + 1}`,
              type: "character",
              position,
              orientation: random(0, 2 * pi(), 0.01),
              collisions: {
                hitbox: {
                  shape: "circle",
                  radius: 12,
                },
              },
            },
          })
        },

        // this event handler is needed for React
        "instance:click"(instance, id, { notify }) {
          notify({ id: "instance:remove", payload: id })
        },
      },
    ],

    character: [
      enableCharacter(),
      {
        // this event handler is needed in React
        "instance:click"(instance, id, { notify }) {
          notify({ id: "instance:remove", payload: id })
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
  },
}
