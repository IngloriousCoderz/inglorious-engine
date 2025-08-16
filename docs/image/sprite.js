import { enableSprite } from "@inglorious/game/decorators/image/sprite.js"
import { Sprite } from "@inglorious/game/sprite.js"

export default {
  types: {
    cat: [
      enableSprite(),
      {
        "game:update"(instance, dt, options) {
          Sprite.play("sleepy", instance, dt, options)
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
      position: [400, 0, 300],
      sprite: {
        image: {
          id: "neko",
          src: "/sprites/neko.png",
          imageSize: [192, 192],
          tileSize: [32, 32],
          scale: 2,
        },
        speed: 0.2,
        frames: {
          sleepy: [4, 10, 10, 3, 9, 15, 9, 15, 15],
        },
      },
    },
  },
}
