import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { subtract } from '@ezpz/utils/math/linear-algebra/vectors'
import { randomRange } from '@ezpz/utils/math/random'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  types: {
    mouse: mouseType({
      'mouse:click'(instance, event, { instances, notify }) {
        const ids = Object.keys(instances).filter((id) =>
          id.startsWith('character')
        )
        const maxId = ids.length
          ? Number(ids[ids.length - 1].replace('character', ''))
          : 0

        notify({
          id: 'instance:add',
          payload: {
            id: `character${maxId + 1}`,
            type: 'character',
            position: subtract(event.payload, [15, 0, 15]),
            orientation: randomRange(0, 2 * pi(), 0.01),
          },
        })
      },
    }),

    character: {
      'character:click'(instance, event, { notify }) {
        notify({ id: 'instance:remove', payload: event.payload })
      },
    },
  },

  state: {
    instances: {
      mouse: mouseInstance(),
    },
  },
}
