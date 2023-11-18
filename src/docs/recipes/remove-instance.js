import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { random } from '@inglorious/utils/math/rng.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'
import * as Point from '@inglorious/utils/physics/collisions/point.js'

export default {
  types: {
    ...mouseType({
      'mouse:click'(instance, event, options) {
        const { instances, notify } = options

        const characters = Object.values(instances).filter(
          ({ type }) => type === 'character'
        )

        const clickedCharacter = Point.findCollision(event.payload, {
          ...options,
          instances: characters,
        })
        if (clickedCharacter) {
          notify({ id: 'instance:remove', payload: clickedCharacter.id })
        }
      },
    }),

    ...Character.type({
      collision: {
        type: 'circle',
        radius: 12,
      },

      // this event handler is needed for React
      'character:click'(instance, event, { notify }) {
        notify({ id: 'instance:remove', payload: event.payload })
      },
    }),
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
              id: `character${index + 1}`,
              type: 'character',
              position: [random(0, 800), 0, random(0, 600)],
              orientation: random(0, 2 * pi(), 0.01),
            },
          ])
      ),
    },
  },
}
