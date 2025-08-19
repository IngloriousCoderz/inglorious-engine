import { bounce } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableFps } from "@inglorious/game/decorators/fps.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      enableCharacter(),
      {
        update(instance, dt, { instances }) {
          const { game } = instances
          merge(instance, bounce(instance, dt, game.bounds))
        },
      },
    ],

    fps: [enableFps()],
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
