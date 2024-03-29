import * as Character from '@inglorious/game/types/character.js'
import * as Mouse from '@inglorious/game/types/mouse.js'
import { random } from '@inglorious/utils/math/rng.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  types: {
    mouse: Mouse.type(),

    character: Character.type({
      hitbox: {
        shape: 'circle',
        radius: 12,
      },

      'instance:click'(instance, event, { notify }) {
        notify({ id: 'instance:remove', payload: event.payload })
      },
    }),
  },

  state: {
    instances: {
      mouse: { id: 'mouse', type: 'mouse', position: [400, 0, 300] },

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
