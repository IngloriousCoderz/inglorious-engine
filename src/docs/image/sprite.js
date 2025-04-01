import { enableSprite } from "@inglorious/game/decorators/sprite.js"
import * as Sprite from "@inglorious/game/sprite.js"

export default {
  types: {
    cat: [
      enableSprite({
        image: {
          id: "neko",
          src: "/sprites/neko.png",
          imageSize: [192, 192],
          tileSize: [32, 32],
          scale: 2,
        },
        speed: 0.2,
        states: {
          idle: {
            frames: [
              [4, 0],
              [4, 1],
              [4, 1],
              [3, 0],
              [3, 1],
              [3, 2],
              [3, 1],
              [3, 2],
              [3, 2],
            ],
          },
        },
      }),
      {
        states: {
          idle: {
            "game:update"(instance, event, options) {
              Sprite.play("idle", instance, options)
            },
          },
        },
      },
    ],
  },

  instances: {
    game: {
      pixelated: true,
    },

    neko: {
      type: "cat",
      state: "idle",
      position: [400, 0, 300],
    },
  },
}
