import { randomRange } from '@ezpz/utils/math/random'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  types: {
    game: {
      'button:click'(instance, event, { engine }) {
        const characters = Object.keys(engine.instances)

        engine.add(`character${characters.length + 1}`, {
          type: 'character',
          position: [randomRange(0, 800), 0, randomRange(0, 600)],
          orientation: randomRange(0, 2 * pi(), 0.01),
        })
      },
    },

    elapsed: {
      'game:update'(instance, event, { elapsed }) {
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
