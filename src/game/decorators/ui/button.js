import draw from "@inglorious/ui/canvas/form/button.js"

export function enableButton() {
  return {
    draw,

    states: {
      default: {
        instanceClick(instance) {
          instance.state = "pressed"
        },
      },

      pressed: {
        instanceRelease(instance) {
          instance.state = "default"
        },
      },
    },
  }
}
