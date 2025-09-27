import { paddle } from "./types/paddle.ijs"
import { ball } from "./types/ball.ijs"
import { score } from "./types/score.ijs"

const WIDTH = 432
const HEIGHT = 243

export default {
  types: { score, paddle, ball },

  entities: {
    game: {
      type: "game",
      devMode: true,
      pixelated: true,
      size: [WIDTH, HEIGHT],
      backgroundColor: "rgb(40, 45, 52)",
    },

    score: {
      type: "score",
      position: v(WIDTH / 2, HEIGHT, 0),
      font: "'Press Start 2P'",
      size: 8,
      color: "white",
      textAlign: "center",
      value: "Hello Pong!",
    },

    player1: {
      type: "paddle",
      position: v(WIDTH - 10, 30, 0),
      size: v(5, 20, 0),
      color: "transparent",
      backgroundColor: "white",
    },

    player2: {
      type: "paddle",
      position: v(10, HEIGHT - 50, 0),
      size: v(5, 20, 0),
      color: "transparent",
      backgroundColor: "white",
    },

    ball: {
      type: "ball",
      position: v(WIDTH / 2 - 2, HEIGHT / 2 - 2, 0),
      size: v(4, 4, 0),
      color: "transparent",
      backgroundColor: "white",
    },
  },
}
