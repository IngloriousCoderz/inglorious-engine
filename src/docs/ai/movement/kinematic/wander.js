import wander from '@inglorious/engine/ai/movement/kinematic/wander.js'
import { flip } from '@inglorious/game/bounds.js'
import * as Character from '@inglorious/game/types/character.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  types: {
    character: Character.type({
      'game:update'(instance, event, { dt, config }) {
        merge(instance, wander(instance, { dt }))
        flip(instance, config.bounds)
      },
    }),
  },

  state: {
    instances: {
      character: {
        id: 'character',
        type: 'character',
        maxSpeed: 250,
        maxAngularSpeed: pi() / 4,
        position: [400, 0, 300],
      },
    },
  },
}
