import seek from '@inglorious/engine/ai/movement/steering/seek'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    ...mouseType(),

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const target = instances.mouse

        merge(instance, seek(instance, target, { dt }))
        clampToBounds(instance, config.bounds)
      },
    },
  },

  state: {
    instances: {
      ...mouseInstance(),

      character: {
        type: 'character',
        maxAcceleration: 10,
        maxSpeed: 2,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
