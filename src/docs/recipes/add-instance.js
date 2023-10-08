import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { subtract } from '@ezpz/utils/math/linear-algebra/vectors'
import { randomRange } from '@ezpz/utils/math/random'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  types: {
    mouse: mouseType({
      'mouse:click'(instance, event, { instances, notify }) {
        const characters = Object.keys(instances)

        notify({
          id: 'instance:add',
          payload: {
            id: `character${characters.length + 1}`,
            type: 'character',
            position: subtract(event.payload, [15, 0, 15]),
            orientation: randomRange(0, 2 * pi(), 0.01),
          },
        })
      },
    }),

    character: {},
  },

  state: {
    instances: {
      mouse: mouseInstance(),
    },
  },
}
