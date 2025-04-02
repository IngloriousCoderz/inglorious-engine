import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { enableButton } from "@inglorious/game/decorators/ui/button.js"

export default {
  types: {
    mouse: [enableMouse()],

    button: [
      enableButton(),
      {
        size: [100, 50, 0],
        color: "black",
        backgroundColor: "darkgrey",
      },
    ],
  },

  instances: {
    mouse: {
      type: "mouse",
    },

    rect1: {
      type: "button",
      position: [400, 0, 300],
    },
  },
}
