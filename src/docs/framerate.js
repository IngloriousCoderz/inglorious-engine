import { bounce } from '@inglorious/game/bounds.js'
import { enableCharacter } from '@inglorious/game/decorators/character.js'
import { enableFps } from '@inglorious/game/decorators/fps.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  loop: { type: 'fixed', fps: 10 },

  types: {
    fps: [enableFps()],

    character: [
      enableCharacter(),
      {
        'game:update'(instance, event, options) {
          merge(instance, bounce(instance, options))
        },
      },
    ],
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
