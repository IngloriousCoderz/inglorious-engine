import seek from '@inglorious/engine/ai/movement/kinematic/seek'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    mouse: mouseType(),

    character: {
      'game:update'(instance, event, { dt, instances }) {
        const target = instances.mouse

        merge(instance, seek(instance, target, { dt }))
      },
    },
  },

  state: {
    instances: {
      mouse: mouseInstance(),

      character: {
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
