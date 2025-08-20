import { character } from "@inglorious/game/behaviors/character.js"
import { fps } from "@inglorious/game/behaviors/fps.js"
import { bounce } from "@inglorious/game/bounds.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  loop: { type: "fixed", fps: 10 },

  types: {
    character: [
      character(),
      {
        update(instance, dt, { instances }) {
          const { game } = instances
          merge(instance, bounce(instance, dt, game.bounds))
        },
      },
    ],

    fps: [fps()],
  },

  instances: {
    character: {
      type: "character",
      maxSpeed: 250,
      orientation: pi() / 6,
      position: zero(),
    },

    fps: {
      type: "fps",
      position: [0, 0, 600],
    },
  },
}
