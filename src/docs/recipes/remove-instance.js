import * as Mouse from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { random } from '@inglorious/utils/math/rng.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  types: {
    mouse: Mouse.type(),

    character: Character.type({
      hitbox: {
        type: 'circle',
        radius: 12,
      },

      'instance:click'(instance, event, { notify }) {
        notify({ id: 'instance:remove', payload: event.payload })
      },
    }),
  },

  state: {
    instances: {
      mouse: Mouse.instance(),

      ...Object.fromEntries(
        Array(5)
          .fill(null)
          .map((_, index) => [
            `character${index + 1}`,
            Character.instance({
              id: `character${index + 1}`,
              position: [random(0, 800), 0, random(0, 600)],
              orientation: random(0, 2 * pi(), 0.01),
            }),
          ])
      ),
    },
  },
}
