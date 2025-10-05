/* eslint-disable no-magic-numbers */
import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern"
import { fps } from "@inglorious/engine/behaviors/fps"
import {
  controls,
  createControls,
} from "@inglorious/engine/behaviors/input/controls"
import { createTouch, touch } from "@inglorious/engine/behaviors/input/touch"
import { clamped } from "@inglorious/engine/behaviors/physics/clamped"
import { renderFps } from "@inglorious/renderer-2d/fps"
import { renderRectangle } from "@inglorious/renderer-2d/shapes/rectangle"
import { magnitude } from "@inglorious/utils/math/vector"

import { ball } from "./behaviors/ball"
import { game } from "./behaviors/game"
import { paddle } from "./behaviors/paddle"
import { score } from "./behaviors/score"
import { text } from "./behaviors/text"

const WIDTH = 432
const HEIGHT = 243

export default {
  types: {
    touch: touch(),

    ...controls("player1", "player2"),
    game,
    text,
    score,
    paddle: [{ render: renderRectangle }, paddle, modernControls(), clamped()],
    ball,
    fps: [{ render: renderFps }, fps({ accuracy: 0 })],
  },

  entities: {
    touch: createTouch(),

    ...createControls("player1", {
      KeyW: "moveUp",
      KeyS: "moveDown",
      Space: "action",
    }),
    ...createControls("player2", {
      ArrowUp: "moveUp",
      ArrowDown: "moveDown",
    }),

    game: {
      type: "game",
      devMode: true,
      pixelated: true,
      size: [WIDTH, HEIGHT],
      backgroundColor: "rgb(40, 45, 52)",
      state: "start",
      servingPlayer: "player1",
    },

    message: {
      type: "text",
      position: v(WIDTH / 2, 0, HEIGHT - 10),
      font: "'Press Start 2P'",
      size: 8,
      lineHeight: 12,
      color: "white",
      textAlign: "center",
      value: "Welcome to Pong!\nPress Spacebar to begin!",
    },

    score: {
      type: "score",
      position: v(WIDTH / 2, 0, HEIGHT / 2 + 28),
      font: "'Press Start 2P'",
      size: 32,
      color: "white",
      textAlign: "center",
      player1: 0,
      player2: 0,
      maxScore: 10,
    },

    player1: {
      type: "paddle",
      size: v(5, 0, 20),
      color: "transparent",
      backgroundColor: "white",
      collisions: {
        hitbox: { shape: "rectangle" },
        touch: { shape: "rectangle" },
      },
      maxSpeed: 200,
      position: v(10, 0, HEIGHT - 50),
    },

    player2: {
      type: "paddle",
      size: v(5, 0, 20),
      color: "transparent",
      backgroundColor: "white",
      collisions: {
        hitbox: { shape: "rectangle" },
        touch: { shape: "rectangle" },
      },
      maxSpeed: 200,
      position: v(WIDTH - 10, 0, 30),
    },

    ball: {
      type: "ball",
      size: v(4, 0, 4),
      color: "transparent",
      backgroundColor: "white",
      collisions: {
        hitbox: { shape: "rectangle" },
        touch: { shape: "point" },
      },
      maxSpeed: magnitude(v(100, 0, 50)),
      speedIncrease: 1.03,
      position: v(WIDTH / 2, 0, HEIGHT / 2),
    },

    fps: {
      type: "fps",
      position: v(10, 0, HEIGHT - 10),
      font: "'Press Start 2P'",
      size: 8,
      color: "rgb(0, 255, 0)",
    },

    audio: {
      type: "audio",
      sounds: {
        paddleHit: { url: "/sounds/paddle_hit.ogg" },
        score: { url: "/sounds/score.ogg" },
        wallHit: { url: "/sounds/wall_hit.ogg" },
      },
    },
  },
}
