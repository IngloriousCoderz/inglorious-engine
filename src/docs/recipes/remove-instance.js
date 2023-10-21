import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { random } from '@inglorious/utils/math/rng'
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
              position: [random(0, 800), 0, random(0, 600)],
              orientation: random(0, 2 * pi(), 0.01),
            },
          ])
      ),
    },
  },
}
