import * as Mouse from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { random } from '@inglorious/utils/math/rng.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  types: {
    mouse: Mouse.type({
      'mouse:click'(instance, event, { instances, notify }) {
        const characters = Object.keys(instances)

        notify({
          id: 'instance:add',
          payload: Character.instance({
            id: `character${characters.length + 1}`,
            position: event.payload,
            orientation: random(0, 2 * pi(), 0.01),
          }),
        })
      },
    }),

    character: Character.type(),
  },

  state: {
    instances: {
      mouse: Mouse.instance(),
    },
  },
}
