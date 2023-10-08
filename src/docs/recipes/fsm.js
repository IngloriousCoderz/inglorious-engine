import arrive from '@ezpz/engine/ai/movement/kinematic/arrive'
import wander from '@ezpz/engine/ai/movement/kinematic/wander'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { clampToBounds, flip } from '@ezpz/utils/characters'
import { merge } from '@ezpz/utils/data-structures/objects'
import { length } from '@ezpz/utils/math/linear-algebra/vector'
import { subtract } from '@ezpz/utils/math/linear-algebra/vectors'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  types: {
    mouse: mouseType(),

    elapsed: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      states: {
        meandering: {
          'game:update'(instance, event, { elapsed, config, instances }) {
            const target = instances.mouse

            merge(instance, wander(instance, { elapsed }))
            flip(instance, config.bounds)

            if (length(subtract(instance.position, target.position)) < 200) {
              instance.state = 'hunting'
            }
          },
        },

        hunting: {
          'game:update'(instance, event, { elapsed, config, instances }) {
            const target = instances.mouse

            merge(instance, arrive(instance, target, { elapsed }))
            clampToBounds(instance, config.bounds)

            if (length(subtract(instance.position, target.position)) >= 200) {
              instance.state = 'meandering'
            }
          },
        },
      },
    },

    form: {},
  },

  state: {
    instances: {
      mouse: mouseInstance(),

      debug: {
        type: 'elapsed',
        value: 0,
      },

      character: {
        type: 'character',
        state: 'meandering',
        maxSpeed: 250,
        maxRotation: pi() / 4,
        orientation: 0,
        position: [400, 0, 300],
      },
    },
  },
}
