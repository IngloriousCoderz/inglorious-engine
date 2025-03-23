import draw from "@inglorious/ui/canvas/shapes/rectangle.js"

export default {
  types: {
    rectangle: {
      width: 100,
      height: 50,
      color: "black",
      backgroundColor: "darkgrey",
      draw,
    },
  },

  instances: {
    rect1: {
      id: "rect1",
      type: "rectangle",
      position: [400, 0, 300],
    },
  },
}
