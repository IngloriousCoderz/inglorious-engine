import engine from '../../engine'
import { clampToBounds } from '../../utils/characters'
import { randomRange } from '../../utils/maths'
import * as vectors from '../../utils/vectors'

export default {
  bounds: [0, 0, 800, 600],
  types: {
    game: {
      'character:click'(_, { payload }) {
        engine.store.remove(payload)
      },
    },

    cursor: {
      'mouse:move'(instance, { payload }) {
        instance.position = vectors.subtract(payload, [16, 0, 16])

        clampToBounds(instance, engine.config.bounds)
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
      debug: {
        type: 'elapsed',
        value: 0,
      },

      cursor: {
        type: 'cursor',
        position: [0, 0, 0],
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
