import { Sprite } from "@inglorious/engine/animation/sprite.js"
import { renderSprite } from "@inglorious/renderers/canvas/image/sprite.js"

export default {
  devMode: true,
  types: {
    cat: [
      { render: renderSprite },
      {
        update(entity, dt, api) {
          Sprite.play("sleepy", { entity, dt, notify: api.notify })
        },
      },
    ],
  },

  entities: {
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
