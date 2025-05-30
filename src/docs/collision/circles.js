import { collidesWith } from "@inglorious/engine/collision/detection.js"
import { bounce } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { mod } from "@inglorious/utils/math/numbers.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      enableCharacter(),
      {
        "game:update"(instance, event, options) {
          const characters = Object.values(options.instances).filter(
            ({ type }) => type === "character",
          )
          const target = characters.find(({ id }) => id !== instance.id)

          if (collidesWith(instance, target)) {
            instance.orientation += pi()
            instance.orientation = mod(instance.orientation, 2 * pi())
          }
          merge(instance, bounce(instance, options))
        },
      },
    ],
  },

  instances: {
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
