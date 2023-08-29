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
    instances: [
      {
        type: 'elapsed',
        value: 0,
      },
      {
        type: 'character',
        maxSpeed: 500,
        maxRotation: Math.PI / 2,
        position: [0, 0, 300],
        direction: [1, 0, 0],
      },
    ],
  },
}
