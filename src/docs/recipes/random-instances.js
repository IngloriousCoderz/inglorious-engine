import { randomRange } from '@ezpz/utils/math/random'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  types: {
    character: {},
  },

  state: {
    instances: {
      ...Object.fromEntries(
        Array(100)
          .fill(null)
          .map((_, index) => [
            `character${index + 1}`,
            {
              type: 'character',
              position: [randomRange(0, 800), 0, randomRange(0, 600)],
              orientation: randomRange(0, 2 * pi(), 0.01),
            },
          ])
      ),
    },
  },
}
