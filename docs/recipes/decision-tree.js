import { arrive } from "@inglorious/engine/ai/movement/kinematic/arrive.js"
import { Sprite } from "@inglorious/engine/animation/sprite.js"
import { fsm } from "@inglorious/engine/behaviors/fsm.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { renderSprite } from "@inglorious/renderers/canvas/image/sprite.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"
import { decide } from "@inglorious/utils/algorithms/decision-tree.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { length } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"

// A reusable decision tree node
const wakeUp = () => ({
  test({ entity, target }) {
    const distance = length(subtract(target.position, entity.position))
    return distance >= 10
  },
  true() {
    return "aware"
  },
  false({ entity }) {
    return entity.state
  },
})

// Our decision tree
const nextState = {
  test({ entity }) {
    return entity.state
  },
  idle() {
    return {
      test({ entity, target }) {
        const distance = length(subtract(target.position, entity.position))
        return distance < 250
      },
      true() {
        return "aware"
      },
      false({ entity }) {
        return entity.state
      },
    }
  },
  chasing() {
    return {
      test({ entity, target }) {
        const distance = length(subtract(target.position, entity.position))
        return distance >= 250
      },
      true() {
        return "idle"
      },
      false() {
        return {
          test({ entity, target }) {
            const distance = length(subtract(target.position, entity.position))
            return distance < 10
          },
          true() {
            return "sleepy"
          },
          false({ entity }) {
            return entity.state
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
          update(entity, dt, { api }) {
            const mouse = api.getEntity("mouse")

            Sprite.play("idle", { entity, dt, notify: api.notify })

            entity.state = decide(nextState, { entity, target: mouse })
          },
        },

        aware: {
          update(entity, dt, { api }) {
            Sprite.play("aware", { entity, dt, notify: api.notify })
          },

          spriteAnimationEnd(entity, { id, animation }) {
            // always check who originated the event and which sprite is running!
            if (id === entity.id && animation === "aware") {
              entity.state = "chasing"
            }
          },
        },

        chasing: {
          update(entity, dt, { api }) {
            const mouse = api.getEntity("mouse")

            merge(entity, arrive(entity, mouse, dt))

            const animation = Sprite.move8(entity)
            Sprite.play(animation, { entity, dt, notify: api.notify })

            entity.state = decide(nextState, { entity, target: mouse })
          },
        },

        sleepy: {
          update(entity, dt, { api }) {
            const mouse = api.getEntity("mouse")

            Sprite.play("sleepy", { entity, dt, notify: api.notify })

            entity.state = decide(nextState, { entity, target: mouse })
          },

          spriteAnimationEnd(entity, { id, animation }) {
            // always check who originated the event and which sprite is running!
            if (id === entity.id && animation === "sleepy") {
              entity.state = "sleeping"
            }
          },
        },

        sleeping: {
          update(entity, dt, { api }) {
            const mouse = api.getEntity("mouse")

            Sprite.play("sleeping", { entity, dt, notify: api.notify })

            entity.state = decide(nextState, { entity, target: mouse })
          },
        },
      }),
    ],
  },

  entities: {
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
