import fps, { animate } from '@inglorious/utils/canvas/fps.js'

export default {
  types: {
    fps: {
      'game:update'(instance, event, options) {
        instance.value = options.dt
        animate(instance, options)
      },

      draw: fps,
    },
  },

  state: {
    instances: {
      instance1: {
        type: 'fps',
        position: [0, 0, 600],
      },
    },
  },
}
