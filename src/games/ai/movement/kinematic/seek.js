import seek from '../../../../ai/movement/kinematic/seek'
import engine from '../../../../engine'
import { clampToBounds } from '../../../../utils/characters'
import * as vectors from '../../../../utils/vectors'

export default {
  bounds: [0, 0, 800, 600],
  types: {
    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },
    cursor: {
      'mouse:move'(instance, { payload }) {
        instance.position = vectors.subtract(payload, [16, 0, 16])

        clampToBounds(instance, engine.config.bounds)
      },
    },
    kitty: {
      'game:update'(instance, _, options) {
        const target = engine.getState().instances.cursor
        instance = { ...instance, ...seek(instance, target, options) }

        clampToBounds(instance, engine.config.bounds)

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
