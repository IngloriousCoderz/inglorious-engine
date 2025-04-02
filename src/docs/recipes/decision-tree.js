import arrive from "@inglorious/engine/ai/movement/kinematic/arrive.js"
import { enableSprite } from "@inglorious/game/decorators/image/sprite.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { Sprite } from "@inglorious/game/sprite.js"
import { decide } from "@inglorious/utils/algorithms/decision-tree.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { length } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"

// A reusable decision tree node
const wakeUp = () => ({
  test: ({ instance, target }) => {
    const distance = length(subtract(target.position, instance.position))
    return distance >= 10
  },
  true: () => "aware",
  false: ({ instance }) => instance.state,
})

// Our decision tree
const nextState = {
  test: ({ instance }) => instance.state,
  idle: () => ({
    test: ({ instance, target }) => {
      const distance = length(subtract(target.position, instance.position))
      return distance < 250
    },
    true: () => "aware",
    false: ({ instance }) => instance.state,
  }),
  chasing: () => ({
    test: ({ instance, target }) => {
      const distance = length(subtract(target.position, instance.position))
      return distance >= 250
    },
    true: () => "idle",
    false: () => ({
      test: ({ instance, target }) => {
        const distance = length(subtract(target.position, instance.position))
        return distance < 10
      },
      true: () => "sleepy",
      false: ({ instance }) => instance.state,
    }),
  }),
  sleepy: wakeUp,
  sleeping: wakeUp,
}

export default {
  types: {
    mouse: [enableMouse()],

    cat: [
      enableSprite(),
      {
        states: {
          idle: {
            "game:update"(instance, event, options) {
              const { mouse } = options.instances

              Sprite.play("idle", instance, options)

              instance.state = decide(nextState, { instance, target: mouse })
            },
          },

          aware: {
            "game:update"(instance, event, options) {
              Sprite.play("aware", instance, options)
            },

            "sprite:animationEnd"(instance, event) {
              const { id, spriteState } = event.payload

              // always check who originated the event and which sprite is running!
              if (id === instance.id && spriteState === "aware") {
                instance.state = "chasing"
              }
            },
          },

          chasing: {
            "game:update"(instance, event, options) {
              const { mouse } = options.instances

              merge(instance, arrive(instance, mouse, options))

              const spriteState = Sprite.move8(instance, mouse)
              Sprite.play(spriteState, instance, options)

              instance.state = decide(nextState, { instance, target: mouse })
            },
          },

          sleepy: {
            "game:update"(instance, event, options) {
              const { mouse } = options.instances

              Sprite.play("sleepy", instance, options)

              instance.state = decide(nextState, { instance, target: mouse })
            },

            "sprite:animationEnd"(instance, event) {
              const { id, spriteState } = event.payload

              // always check who originated the event and which sprite is running!
              if (id === instance.id && spriteState === "sleepy") {
                instance.state = "sleeping"
              }
            },
          },

          sleeping: {
            "game:update"(instance, event, options) {
              const { mouse } = options.instances

              Sprite.play("sleeping", instance, options)

              instance.state = decide(nextState, { instance, target: mouse })
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

    mouse: {
      type: "mouse",
      position: [0, 0, 0],
    },

    neko: {
      type: "cat",
      state: "idle",
      maxSpeed: 250,
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
          idle: [4],
          aware: [0, 4],
          leftUp: [0x80000000 + 23, 0x80000000 + 29],
          up: [28, 30, 28, 31],
          rightUp: [23, 29],
          right: [16, 22],
          rightDown: [13, 14],
          down: [1, 2, 1, 7],
          leftDown: [0x80000000 + 13, 0x80000000 + 14],
          left: [0x80000000 + 16, 0x80000000 + 22],
          sleepy: [4, 10, 10, 3, 9, 15, 9, 15, 15],
          sleeping: [26, 26, 27, 27],
        },
      },
    },
  },
}
