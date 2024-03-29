import { bounce } from '@inglorious/game/bounds.js'
import * as Character from '@inglorious/game/types/character.js'
import * as Fps from '@inglorious/game/types/fps.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  loop: { type: 'fixed', fps: 10 },

  types: {
    fps: Fps.type(),

    character: Character.type({
      'game:update'(instance, event, options) {
        merge(instance, bounce(instance, options))
      },
    }),
  },

  state: {
    instances: {
      fps: {
        id: 'fps',
        type: 'fps',
        position: [0, 0, 600],
      },

      character: {
        id: 'character',
        type: 'character',
        maxSpeed: 250,
        orientation: pi() / 6,
        position: [0, 0, 0],
      },
    },
  },
}
