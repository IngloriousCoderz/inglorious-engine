import draw from "@inglorious/ui/canvas/form/button.js"

export function enableButton() {
  return {
    draw,

    states: {
      default: {
        "instance:click"(instance) {
          instance.state = "pressed"
        },
      },

      pressed: {
        "instance:release"(instance) {
          instance.state = "default"
        },
      },
    },
  }
}
