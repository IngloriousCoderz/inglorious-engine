import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { random } from "@inglorious/utils/math/rng.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [enableCharacter()],
  },

  instances: {
    ...Object.fromEntries(
      Array(100)
        .fill(null)
        .map((_, index) => [
          `character${index + 1}`,
          {
            id: `character${index + 1}`,
            type: "character",
            position: [random(0, 800), 0, random(0, 600)],
            orientation: random(0, 2 * pi(), 0.01),
          },
        ]),
    ),
  },
}
