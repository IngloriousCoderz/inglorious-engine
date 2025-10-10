/* eslint-disable no-magic-numbers */
import { fps } from "@inglorious/engine/behaviors/fps"
import { createTouch, touch } from "@inglorious/engine/behaviors/input/touch"
import { renderFps } from "@inglorious/renderer-2d/fps"
import { renderImage } from "@inglorious/renderer-2d/image/image"
import { zero } from "@inglorious/utils/math/vector"

import { game } from "./behaviors/game"

const WIDTH = 512
const HEIGHT = 288

export default {
  types: {
    touch: touch(),

    game,
    fps: [{ render: renderFps }, fps({ accuracy: 0 })],

    background: { render: renderImage },
    ground: { render: renderImage },
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

    images: {
      type: "images",
      images: {
        background: { url: "/images/background.png" },
        ground: { url: "/images/ground.png" },
      },
    },

    audio: {
      type: "audio",
      sounds: {
        // paddleHit: { url: "/sounds/paddle_hit.ogg" },
        // score: { url: "/sounds/score.ogg" },
        // wallHit: { url: "/sounds/wall_hit.ogg" },
      },
    },

    background: {
      type: "background",
      position: zero(),
      image: {
        id: "background",
        imageSize: [WIDTH, HEIGHT],
        anchor: [0, 1],
      },
    },

    ground: {
      type: "ground",
      position: zero(),
      image: {
        id: "ground",
        imageSize: [WIDTH, 16],
        anchor: [0, 1],
      },
    },
  },
}
