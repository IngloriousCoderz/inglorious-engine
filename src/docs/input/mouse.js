import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"

export default {
  types: {
    mouse: [enableMouse()],

    character: [
      enableCharacter(),

      {
        "game:update"(instance, event, options) {
          const { mouse } = options.instances
          instance.position = mouse.position
        },
      },
    ],
  },

  instances: {
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
