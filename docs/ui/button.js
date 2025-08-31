import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { button } from "@inglorious/engine/behaviors/ui/button.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"

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

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

    mouse: {
      type: "mouse",
    },

    rect1: {
      type: "button",
      position: [400, 0, 300],
    },
  },
}
