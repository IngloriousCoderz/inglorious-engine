import { fps } from "@inglorious/game/behaviors/fps.js"
import { bounce } from "@inglorious/game/bounds.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { renderFps } from "@inglorious/ui/canvas/fps.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      { render: renderCharacter },
      {
        update(instance, dt, { instances }) {
          const { game } = instances
          merge(instance, bounce(instance, dt, game.bounds))
        },
      },
    ],

    fps: [{ render: renderFps }, fps()],
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
