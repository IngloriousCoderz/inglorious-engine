import { collidesWith } from "@inglorious/engine/collision/detection.js"
import { bounce } from "@inglorious/game/bounds.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { mod } from "@inglorious/utils/math/numbers.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      { render: renderCharacter },
      {
        update(instance, dt, { instances }) {
          const { game } = instances
          const characters = Object.values(instances).filter(
            ({ type }) => type === "character",
          )
          const target = characters.find(({ id }) => id !== instance.id)

          if (collidesWith(instance, target)) {
            instance.orientation += pi()
            instance.orientation = mod(instance.orientation, 2 * pi())
          }
          merge(instance, bounce(instance, dt, game.bounds))
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
