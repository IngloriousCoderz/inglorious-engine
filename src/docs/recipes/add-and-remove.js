import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors'
import { pi } from '@inglorious/utils/math/trigonometry'
import { random } from '@inglorious/utils/math/trigonometry/rng'

export default {
  types: {
    ...mouseType({
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
            orientation: random(0, 2 * pi(), 0.01),
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
      ...mouseInstance(),
    },
  },
}
