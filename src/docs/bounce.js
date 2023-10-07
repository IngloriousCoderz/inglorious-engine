import { bounce } from '@ezpz/utils/characters'

export default {
  bounds: [0, 0, 800, 600],

  types: {
    elapsed: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, event, { engine }) {
        bounce(instance, engine.config.bounds)
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
        position: [0, 0, 0],
        velocity: [10, 0, 5],
        orientation: 0,
      },
    },
  },
}
