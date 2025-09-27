/* eslint-disable no-magic-numbers */
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls"
import { magnitude } from "@inglorious/utils/math/vector"

import { ball } from "./types/ball.ijs"
import { fps } from "./types/fps.ijs"
import { game } from "./types/game.ijs"
import { paddle } from "./types/paddle.ijs"
import { score } from "./types/score.ijs"
import { text } from "./types/text.ijs"

const WIDTH = 432
const HEIGHT = 243

const controls = setupControls()
export default {
  types: { ...controls.types, game, text, score, paddle, ball, fps },

  entities: {
    ...controls.entities,
    ...controlsEntities("input1", ["player1"], {
      KeyW: "moveUp",
      KeyS: "moveDown",
    }),
    ...controlsEntities("input2", ["player2"], {
      KeyI: "moveUp",
      KeyK: "moveDown",
    }),

    game: {
      type: "game",
      devMode: true,
      pixelated: true,
      size: [WIDTH, HEIGHT],
      backgroundColor: "rgb(40, 45, 52)",
    },

    message: {
      type: "text",
      position: v(WIDTH / 2, 0, HEIGHT),
      font: "'Press Start 2P'",
      size: 8,
      color: "white",
      textAlign: "center",
      value: "Hello Pong!",
    },

    score: {
      type: "score",
      position: v(WIDTH / 2, 0, HEIGHT - 20),
      font: "'Press Start 2P'",
      size: 32,
      color: "white",
      textAlign: "center",
      player1: 0,
      player2: 0,
    },

    player1: {
      type: "paddle",
      initialPosition: v(10, 0, HEIGHT - 50),
      size: v(5, 0, 20),
      color: "transparent",
      backgroundColor: "white",
      collisions: { hitbox: { shape: "rectangle" } },
      maxSpeed: 200,
      position: v(10, 0, HEIGHT - 50),
    },

    player2: {
      type: "paddle",
      maxSpeed: 200,
      initialPosition: v(WIDTH - 10, 0, 30),
      size: v(5, 0, 20),
      color: "transparent",
      backgroundColor: "white",
      collisions: { hitbox: { shape: "rectangle" } },
      position: v(WIDTH - 10, 0, 30),
    },

    ball: {
      type: "ball",
      initialSpeed: magnitude(v(100, 0, 50)),
      initialPosition: v(WIDTH / 2 - 2, 0, HEIGHT / 2 - 2),
      size: v(4, 0, 4),
      color: "transparent",
      backgroundColor: "white",
      collisions: { hitbox: { shape: "rectangle" } },
      position: v(WIDTH / 2 - 2, 0, HEIGHT / 2 - 2),
      maxSpeed: magnitude(v(100, 0, 50)),
    },

    fps: {
      type: "fps",
      position: v(0, HEIGHT),
      font: "'Press Start 2P'",
      size: 8,
      color: "rgb(0, 255, 0)",
    },
  },
}
