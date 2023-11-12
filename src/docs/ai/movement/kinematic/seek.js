import seek from '@inglorious/engine/ai/movement/kinematic/seek.js'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...mouseType(),

    character: {
      'game:update'(instance, event, { dt, instances }) {
        const target = instances.mouse

        merge(instance, seek(instance, target, { dt }))
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
