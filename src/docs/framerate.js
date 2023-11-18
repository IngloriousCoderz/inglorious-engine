import * as Character from '@inglorious/ui/canvas/character.js'
import { fpsInstance, fpsType } from '@inglorious/ui/canvas/fps.js'
import { bounce } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  loop: { type: 'fixed', fps: 10 },

  types: {
    ...fpsType(),

    ...Character.type({
      'game:update'(instance, event, options) {
        merge(instance, bounce(instance, options))
      },
    }),
  },

  state: {
    instances: {
      ...fpsInstance(),

      ...Character.instance({
        id: 'character1',
        type: 'character',
        maxSpeed: 250,
        orientation: pi() / 6,
        position: [0, 0, 0],
      }),
    },
  },
}
