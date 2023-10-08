import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { subtract } from '@ezpz/utils/math/linear-algebra/vectors'

export default {
  types: {
    mouse: mouseType(),

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { engine }) {
        const { mouse } = engine.instances
        instance.position = subtract(mouse.position, [10, 0, 10])
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
