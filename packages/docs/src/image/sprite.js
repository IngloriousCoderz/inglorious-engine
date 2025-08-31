import { spriteAnimationSystem } from "@inglorious/engine/systems/sprite-animation.js"
import { renderSprite } from "@inglorious/renderer-2d/image/sprite.js"

export default {
  systems: [spriteAnimationSystem()],

  types: {
    cat: [
      { render: renderSprite },
      {
        start(entity) {
          entity.sprite.state = "sleepy"
        },
      },
    ],
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
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
        },
        scale: 2,
        speed: 0.2,
        frames: {
          sleepy: [4, 10, 10, 3, 9, 15, 9, 15, 15],
        },
      },
    },
  },
}
