import seek from "@inglorious/engine/ai/movement/kinematic/seek.js"
import { character } from "@inglorious/game/behaviors/character.js"
import { mouse } from "@inglorious/game/behaviors/input/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [mouse()],

    character: [
      character(),
      {
        update(instance, dt, { instances }) {
          const { mouse } = instances

          merge(instance, seek(instance, mouse, dt))
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
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
