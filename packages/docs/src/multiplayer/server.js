import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  entities: {
    player1: {
      type: "character",
      position: [200, 0, 300],
      movement: {},
      collisions: {
        bounds: {
          shape: "circle",
          radius: 12,
        },
      },
    },

    player2: {
      type: "character",
      position: [600, 0, 300],
      orientation: pi(),
      movement: {},
      collisions: {
        bounds: {
          shape: "circle",
          radius: 12,
        },
      },
    },
  },
}
