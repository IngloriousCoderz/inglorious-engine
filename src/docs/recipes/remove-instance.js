import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { randomRange } from '@ezpz/utils/math/random'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  bounds: [0, 0, 800, 600],

  types: {
    mouse: mouseType(),

    game: {
      'character:click'(_, event, { engine }) {
        engine.remove(event.payload)
      },
    },

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {},
  },

  state: {
    instances: {
      mouse: mouseInstance(),

      debug: {
        type: 'elapsed',
        value: 0,
      },

      ...Array(5)
        .fill(null)
        .reduce((acc, _, index) => {
          acc[`character${index + 1}`] = {
            type: 'character',
            position: [randomRange(0, 800), 0, randomRange(0, 600)],
            orientation: randomRange(0, 2 * pi(), 0.01),
          }
          return acc
        }, {}),
    },
  },
}
