import flee from '@inglorious/engine/ai/movement/kinematic/flee.js'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
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

      draw: Character.draw,
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
