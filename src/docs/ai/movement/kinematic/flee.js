import flee from '@inglorious/engine/ai/movement/kinematic/flee.js'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import character from '@inglorious/utils/canvas/character.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...mouseType(),

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const target = instances.mouse

        merge(instance, flee(instance, target, { dt }))
        clampToBounds(instance, config.bounds)
      },

      draw: character,
    },
  },

  state: {
    instances: {
      ...mouseInstance(),

      character: {
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
