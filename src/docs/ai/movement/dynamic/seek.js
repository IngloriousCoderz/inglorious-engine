import seek from '@inglorious/engine/ai/movement/dynamic/seek.js'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...mouseType(),

    ...Character.type({
      'game:update'(instance, event, { dt, config, instances }) {
        const target = instances.mouse

        merge(instance, seek(instance, target, { dt }))
        clampToBounds(instance, config.bounds)
      },
    }),
  },

  state: {
    instances: {
      ...mouseInstance(),

      ...Character.instance({
        id: 'character',
        type: 'character',
        maxAcceleration: 1000,
        maxSpeed: 250,
        position: [400, 0, 300],
      }),
    },
  },
}
