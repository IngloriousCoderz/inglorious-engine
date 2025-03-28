import { bounce } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableFps } from "@inglorious/game/decorators/fps.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      enableCharacter(),
      {
        "game:update"(instance, event, options) {
          merge(instance, bounce(instance, options))
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
      position: [0, 0, 0],
    },

    fps: {
      type: "fps",
      position: [0, 0, 600],
    },
  },
}
