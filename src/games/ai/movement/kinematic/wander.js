import wander from '../../../../ai/movement/kinematic/wander'
import engine from '../../../../engine'
import { flip } from '../../../../utils/characters'

export default {
  bounds: [0, 0, 800, 600],
  types: {
    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },
    character: {
      'game:update'(instance, _, options) {
        Object.assign(instance, wander(instance, options))

        flip(instance, engine.config.bounds)
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
        type: 'character',
        maxSpeed: 250,
        maxRotation: Math.PI / 4,
        position: [0, 0, 300],
        direction: [1, 0, 0],
      },
    },
  },
}
