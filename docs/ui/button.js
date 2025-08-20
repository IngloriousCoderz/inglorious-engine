import { mouse } from "@inglorious/game/behaviors/input/mouse.js"
import { button } from "@inglorious/game/behaviors/ui/button.js"
import { renderMouse } from "@inglorious/ui/canvas/mouse.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    button: [
      button(),
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
