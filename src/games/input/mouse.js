import { mouseInstance, mouseType } from '../../engine/input/mouse'
import { subtract } from '../../utils/vectors'

export default {
  bounds: [0, 0, 800, 600],

  types: {
    mouse: mouseType(),

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { instances }) {
        instance.position = subtract(instances.mouse.position, [10, 0, 10])
      },
    },
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
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
