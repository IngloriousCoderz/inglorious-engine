import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors'
import { random } from '@inglorious/utils/math/rng'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    ...mouseType({
      'mouse:click'(instance, event, { instances, notify }) {
        const characters = Object.keys(instances)

        notify({
          id: 'instance:add',
          payload: {
            id: `character${characters.length + 1}`,
            type: 'character',
            position: subtract(event.payload, [15, 0, 15]),
            orientation: random(0, 2 * pi(), 0.01),
          },
        })
      },
    }),

    character: {},
  },

  state: {
    instances: {
      ...mouseInstance(),
    },
  },
}
