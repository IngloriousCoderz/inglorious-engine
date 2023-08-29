import wander from '../../../../ai/movement/kinematic/wander'
import engine from '../../../../engine'

export default {
  dimensions: [800, 600],
  types: {
    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },
    kitty: {
      'game:update'(instance, _, options) {
        Object.assign(instance, wander(instance, options))

        const [width] = engine.config.dimensions
        if (instance.position[0] < 0) {
          instance.direction = [1, 0, 0]
        } else if (instance.position[0] >= width) {
          instance.direction = [-1, 0, 0]
        }
      },
    },
  },
  state: {
    instances: {
      elapsed: {
        type: 'elapsed',
        value: 0,
      },
      neko: {
        type: 'kitty',
        maxSpeed: 500,
        maxRotation: Math.PI / 2,
        position: [0, 0, 300],
        direction: [1, 0, 0],
      },
    },
  },
}
