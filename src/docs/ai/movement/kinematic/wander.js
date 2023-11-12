import wander from '@inglorious/engine/ai/movement/kinematic/wander.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { flip } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  types: {
    character: {
      'game:update'(instance, event, { dt, config }) {
        merge(instance, wander(instance, { dt }))
        flip(instance, config.bounds)
      },

      draw: Character.draw,
    },
  },

  state: {
    instances: {
      character: {
        type: 'character',
        maxSpeed: 250,
        maxAngularSpeed: pi() / 4,
        position: [400, 0, 300],
      },
    },
  },
}
