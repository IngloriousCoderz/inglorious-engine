import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors'
import { randomRange } from '@inglorious/utils/math/random'
import { pi } from '@inglorious/utils/math/trigonometry'

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
