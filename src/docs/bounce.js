import { bounce } from '@ezpz/utils/character'

export default {
  types: {
    fps: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
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
