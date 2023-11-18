import * as Mouse from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { random } from '@inglorious/utils/math/rng.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'
import * as Point from '@inglorious/utils/physics/collisions/point.js'

export default {
  types: {
    mouse: Mouse.type({
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
          return
        }

        const ids = characters.map(({ id }) => id)

        const maxId = ids.length
          ? Number(ids[ids.length - 1].replace('character', ''))
          : 0

        notify({
          id: 'instance:add',
          payload: Character.instance({
            id: `character${maxId + 1}`,
            position: event.payload,
            orientation: random(0, 2 * pi(), 0.01),
          }),
        })
      },
    }),

    character: Character.type({
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
      mouse: Mouse.instance(),
    },
  },
}
