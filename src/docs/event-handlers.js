export default {
  types: {
    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },
  },

  state: {
    instances: {
      instance1: {
        type: 'fps',
        value: 0,
      },
    },
  },
}
