import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { subtract } from '@ezpz/utils/math/linear-algebra/vectors'

export default {
  types: {
    mouse: mouseType(),

    fps: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, event, { instances }) {
        const { mouse } = instances
        instance.position = subtract(mouse.position, [10, 0, 10])
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
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
