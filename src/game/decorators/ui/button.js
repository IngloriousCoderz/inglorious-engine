import draw from "@inglorious/ui/canvas/form/button.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

export function enableButton() {
  return (type) =>
    extend(type, {
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
    })
}
