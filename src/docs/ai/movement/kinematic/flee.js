import flee from '@ezpz/engine/ai/movement/kinematic/flee'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { clampToBounds } from '@ezpz/utils/character'
import { merge } from '@ezpz/utils/data-structures/objects'

export default {
  types: {
    mouse: mouseType(),

    fps: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, event, { elapsed, config, instances }) {
        const target = instances.mouse

        merge(instance, flee(instance, target, { elapsed }))
        clampToBounds(instance, config.bounds)
      },
    },
  },

  state: {
    instances: {
      mouse: mouseInstance(),

      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
