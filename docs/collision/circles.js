import { findCollision } from "@inglorious/engine/collision/detection.js"
import { bounce } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { mod } from "@inglorious/utils/math/numbers.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      { render: renderCharacter },
      {
        update(entity, dt, options) {
          const { api } = options
          const game = api.getEntity("game")

          const isColliding = findCollision(entity, options)

          if (isColliding) {
            entity.orientation += pi()
            entity.orientation = mod(entity.orientation, 2 * pi())
          }
          merge(entity, bounce(entity, dt, game.bounds))
        },
      },
    ],
  },

  entities: {
    left: {
      type: "character",
      position: [200, 0, 300],
      orientation: 0,
      maxSpeed: 250,
      collisions: {
        hitbox: {
          shape: "circle",
          offset: [-6, 0, -6],
          radius: 12,
        },
      },
    },

    right: {
      type: "character",
      position: [600, 0, 300],
      orientation: pi(),
      maxSpeed: 250,
      collisions: {
        hitbox: {
          shape: "circle",
          offset: [-6, 0, -6],
          radius: 12,
        },
      },
    },
  },
}
