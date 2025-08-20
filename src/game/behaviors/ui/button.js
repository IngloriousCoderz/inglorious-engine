import render from "@inglorious/ui/canvas/form/button.js"

export function button() {
  return {
    render,

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
