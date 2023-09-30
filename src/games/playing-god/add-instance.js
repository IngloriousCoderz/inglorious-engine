import engine from '@ezpz/engine'
import { randomRange } from '@ezpz/utils/math/random'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  bounds: [0, 0, 800, 600],

  types: {
    game: {
      'button:click'(_, event, { instances }) {
        const ids = Object.entries(instances)
          .filter(([, { type }]) => type === 'character')
          .map(([id]) => id)

        const maxId = ids.length
          ? Number(ids[ids.length - 1].replace('character', ''))
          : 0

        engine.store.add(`character${maxId + 1}`, {
          type: 'character',
          position: [randomRange(0, 800), 0, randomRange(0, 600)],
          orientation: randomRange(0, 2 * pi(), 0.01),
        })
      },
    },

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    button: {},

    character: {},
  },

  state: {
    instances: {
      debug: {
        type: 'elapsed',
        value: 0,
      },

      button: {
        type: 'button',
        position: [800 - 66, 0, 0],
        label: 'Add random instance',
      },
    },
  },
}
