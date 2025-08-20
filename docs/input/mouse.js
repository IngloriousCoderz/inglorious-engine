import { character } from "@inglorious/game/behaviors/character.js"
import { mouse } from "@inglorious/game/behaviors/input/mouse.js"

export default {
  types: {
    mouse: [mouse()],

    character: [
      character(),

      {
        update(instance, dt, { instances }) {
          const { mouse } = instances
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
