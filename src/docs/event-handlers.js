import * as Fps from '@inglorious/ui/canvas/fps.js'

export default {
  types: {
    fps: {
      'game:update'(instance, event, options) {
        Fps.play(instance, options)
      },

      draw: Fps.draw,
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
