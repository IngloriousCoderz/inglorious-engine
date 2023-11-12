import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import character from '@inglorious/utils/canvas/character.js'
import { random } from '@inglorious/utils/math/rng.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

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
            position: event.payload,
            orientation: random(0, 2 * pi(), 0.01),
          },
        })
      },
    }),

    character: {
      'character:click'(instance, event, { notify }) {
        notify({ id: 'instance:remove', payload: event.payload })
      },

      draw: character,
    },
  },

  state: {
    instances: {
      ...mouseInstance(),
    },
  },
}
