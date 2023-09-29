import engine from '../../engine'
import { mouseInstance, mouseType } from '../../engine/input/mouse'
import { randomRange } from '../../utils/math'

export default {
  bounds: [0, 0, 800, 600],

  types: {
    mouse: mouseType(),

    game: {
      'character:click'(_, { payload }) {
        engine.store.remove(payload)
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
            orientation: randomRange(0, 2 * Math.PI, 0.01),
          }
          return acc
        }, {}),
    },
  },
}
