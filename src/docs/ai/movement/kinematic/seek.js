import seek from '@inglorious/engine/ai/movement/kinematic/seek.js'
import { enableCharacter } from '@inglorious/game/decorators/character.js'
import * as Mouse from '@inglorious/game/types/mouse.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    mouse: Mouse.type(),

    character: [
      enableCharacter(),
      {
        'game:update'(instance, event, { dt, instances }) {
          const target = instances.mouse

          merge(instance, seek(instance, target, { dt }))
        },
      },
    ],
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
