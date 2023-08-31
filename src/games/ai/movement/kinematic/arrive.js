import arrive from '../../../../ai/movement/kinematic/arrive'
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
    character: {
      'game:update'(instance, _, options) {
        const [target] = engine.getInstances('cursor')
        const arriveOptions = { radius: 8, timeToTarget: 10 }
        instance = {
          ...instance,
          ...arrive(instance, target, { ...options, ...arriveOptions }),
        }

        clampToBounds(instance, engine.config.bounds)

        return instance
      },
    },
  },
  state: {
    instances: {
      instance1: {
        type: 'elapsed',
        value: 0,
      },
      instance2: {
        type: 'cursor',
        position: [0, 0, 0],
      },
      instance3: {
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
