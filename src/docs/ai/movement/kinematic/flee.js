import flee from '@inglorious/engine/ai/movement/kinematic/flee.js'
import { clampToBounds } from '@inglorious/game/bounds.js'
import * as Character from '@inglorious/game/types/character.js'
import * as Mouse from '@inglorious/game/types/mouse.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    mouse: Mouse.type(),

    character: Character.type({
      'game:update'(instance, event, { dt, config, instances }) {
        const target = instances.mouse

        merge(instance, flee(instance, target, { dt }))
        clampToBounds(instance, config.bounds)
      },
    }),
  },

  state: {
    instances: {
      mouse: { id: 'mouse', type: 'mouse', position: [400, 0, 300] },

      character: {
        id: 'character',
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
