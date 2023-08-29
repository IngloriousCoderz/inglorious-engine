import arrive from '../../../../ai/movement/kinematic/arrive'
import engine from '../../../../engine'
import * as vectors from '../../../../utils/vectors'

export default {
  dimensions: [800, 600],
  types: {
    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },
    cursor: {
      'mouse:move'(instance, { payload }) {
        instance.position = vectors.subtract(payload, [16, 0, 16])

        const [width, height] = engine.config.dimensions
        instance.position = vectors.clamp(
          instance.position,
          [0, 0, 0],
          [width, 0, height]
        )
      },
    },
    kitty: {
      'game:update'(instance, _, options) {
        const target = engine.getState().instances.cursor
        const arriveOptions = { radius: 8, timeToTarget: 10 }
        instance = {
          ...instance,
          ...arrive(instance, target, { ...options, ...arriveOptions }),
        }

        const [width, height] = engine.config.dimensions
        instance.position = vectors.clamp(
          instance.position,
          [0, 0, 0],
          [width, 0, height]
        )

        return instance
      },
    },
  },
  state: {
    instances: {
      elapsed: {
        type: 'elapsed',
        value: 0,
      },
      cursor: {
        type: 'cursor',
        position: [0, 0, 0],
      },
      neko: {
        type: 'kitty',
        maxSpeed: 500,
        position: [400, 0, 300],
      },
    },
  },
}
