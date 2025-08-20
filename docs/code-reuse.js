import { fps } from "@inglorious/engine/behaviors/fps.js"
import { bounce } from "@inglorious/engine/physics/bounds.js"
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
        update(entity, dt, { entities }) {
          const { game } = entities
          merge(entity, bounce(entity, dt, game.bounds))
        },
      },
    ],

    fps: [{ render: renderFps }, fps()],
  },

  entities: {
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
