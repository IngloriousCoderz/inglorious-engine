import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { randomRange } from '@inglorious/utils/math/random'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    ...mouseType(),

    character: {
      'character:click'(instance, event, { notify }) {
        notify({ id: 'instance:remove', payload: event.payload })
      },
    },
  },

  state: {
    instances: {
      ...mouseInstance(),

      ...Object.fromEntries(
        Array(5)
          .fill(null)
          .map((_, index) => [
            `character${index + 1}`,
            {
              type: 'character',
              position: [randomRange(0, 800), 0, randomRange(0, 600)],
              orientation: randomRange(0, 2 * pi(), 0.01),
            },
          ])
      ),
    },
  },
}
