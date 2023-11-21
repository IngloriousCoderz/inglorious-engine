import draw from '@inglorious/ui/canvas/form/button.js'

export function type(type) {
  return {
    states: {
      default: {
        'instance:click'(instance, event, options) {
          instance.state = 'pressed'
        },
      },

      pressed: {
        'instance:release'(instance, event, options) {
          instance.state = 'default'
        },
      },
    },

    draw,
    ...type,
  }
}
