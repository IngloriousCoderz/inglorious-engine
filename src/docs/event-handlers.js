export default {
  types: {
    fps: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
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
