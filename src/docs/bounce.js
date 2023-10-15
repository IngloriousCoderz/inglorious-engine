import { bounce } from '@ezpz/utils/character'

export default {
  types: {
    fps: {
      frequency: 0.1,
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, { config }) {
        bounce(instance, config.bounds)
      },
    },
  },

  state: {
    instances: {
      instance1: {
        type: 'fps',
        value: 0,
      },

      instance2: {
        type: 'character',
        position: [0, 0, 0],
        velocity: [10, 0, 5],
      },
    },
  },
}
