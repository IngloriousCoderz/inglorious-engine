/* eslint-disable no-magic-numbers */
import { fps } from "@inglorious/engine/behaviors/fps"
import { createTouch, touch } from "@inglorious/engine/behaviors/input/touch"
import { renderFps } from "@inglorious/renderer-2d/fps"

import { game } from "./behaviors/game"

const WIDTH = 512
const HEIGHT = 288

export default {
  types: {
    touch: touch(),

    game,
    fps: [{ render: renderFps }, fps({ accuracy: 0 })],
  },

  entities: {
    touch: createTouch(),

    game: {
      type: "game",
      devMode: true,
      pixelated: true,
      size: [WIDTH, HEIGHT],
      backgroundColor: "rgb(40, 45, 52)",
      state: "start",
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
        // paddleHit: { url: "/sounds/paddle_hit.ogg" },
        // score: { url: "/sounds/score.ogg" },
        // wallHit: { url: "/sounds/wall_hit.ogg" },
      },
    },
  },
}
