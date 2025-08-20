import arrive from "@inglorious/engine/ai/movement/kinematic/arrive.js"
import { fsm } from "@inglorious/game/behaviors/fsm.js"
import { mouse } from "@inglorious/game/behaviors/input/mouse.js"
import { Sprite } from "@inglorious/game/sprite.js"
import { renderSprite } from "@inglorious/ui/canvas/image/sprite.js"
import { renderMouse } from "@inglorious/ui/canvas/mouse.js"
import { decide } from "@inglorious/utils/algorithms/decision-tree.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { length } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"

// A reusable decision tree node
const wakeUp = () => ({
  test({ instance, target }) {
    const distance = length(subtract(target.position, instance.position))
    return distance >= 10
  },
  true() {
    return "aware"
  },
  false({ instance }) {
    return instance.state
  },
})

// Our decision tree
const nextState = {
  test({ instance }) {
    return instance.state
  },
  idle() {
    return {
      test({ instance, target }) {
        const distance = length(subtract(target.position, instance.position))
        return distance < 250
      },
      true() {
        return "aware"
      },
      false({ instance }) {
        return instance.state
      },
    }
  },
  chasing() {
    return {
      test({ instance, target }) {
        const distance = length(subtract(target.position, instance.position))
        return distance >= 250
      },
      true() {
        return "idle"
      },
      false() {
        return {
          test({ instance, target }) {
            const distance = length(
              subtract(target.position, instance.position),
            )
            return distance < 10
          },
          true() {
            return "sleepy"
          },
          false({ instance }) {
            return instance.state
          },
        }
      },
    }
  },
  sleepy: wakeUp,
  sleeping: wakeUp,
}

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    cat: [
      { render: renderSprite },
      fsm({
        idle: {
          update(instance, dt, { instances, notify }) {
            const { mouse } = instances

            Sprite.play({ state: "idle", instance, dt, notify })

            instance.state = decide(nextState, { instance, target: mouse })
          },
        },

        aware: {
          update(instance, dt, { notify }) {
            Sprite.play({ state: "aware", instance, dt, notify })
          },

          spriteAnimationEnd(instance, { id, spriteState }) {
            // always check who originated the event and which sprite is running!
            if (id === instance.id && spriteState === "aware") {
              instance.state = "chasing"
            }
          },
        },

        chasing: {
          update(instance, dt, { instances, notify }) {
            const { mouse } = instances

            merge(instance, arrive(instance, mouse, dt))

            const spriteState = Sprite.move8(instance)
            Sprite.play({ state: spriteState, instance, dt, notify })

            instance.state = decide(nextState, { instance, target: mouse })
          },
        },

        sleepy: {
          update(instance, dt, { instances, notify }) {
            const { mouse } = instances

            Sprite.play({ state: "sleepy", instance, dt, notify })

            instance.state = decide(nextState, { instance, target: mouse })
          },

          spriteAnimationEnd(instance, event) {
            const { id, spriteState } = event

            // always check who originated the event and which sprite is running!
            if (id === instance.id && spriteState === "sleepy") {
              instance.state = "sleeping"
            }
          },
        },

        sleeping: {
          update(instance, dt, { instances, notify }) {
            const { mouse } = instances

            Sprite.play({ state: "sleeping", instance, dt, notify })

            instance.state = decide(nextState, { instance, target: mouse })
          },
        },
      }),
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
