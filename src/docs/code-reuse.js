import * as Character from '@inglorious/ui/canvas/character.js'
import * as Fps from '@inglorious/ui/canvas/fps.js'
import { bounce } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
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
      fps: Fps.instance(),

      character: Character.instance({
        id: 'character',
        maxSpeed: 250,
        orientation: pi() / 6,
        position: [0, 0, 0],
      }),
    },
  },
}
