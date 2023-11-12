import arrive from '@inglorious/engine/ai/movement/kinematic/arrive'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { decide } from '@inglorious/utils/algorithms/decision-tree'
import * as Sprite from '@inglorious/utils/character/sprite'
import { merge } from '@inglorious/utils/data-structures/objects'
import { length } from '@inglorious/utils/math/linear-algebra/vector'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors'

// A reusable decision tree node
const wakeUp = () => ({
  test: ({ instance, target }) => {
    const distance = length(subtract(target.position, instance.position))
    return distance >= 10
  },
  true: () => ({ state: 'aware', animation: Sprite.resetAnimation() }),
  false: () => ({}),
})

// Our decision tree
const whichState = {
  test: ({ instance }) => instance.state,
  idle: () => ({
    test: ({ instance, target }) => {
      const distance = length(subtract(target.position, instance.position))
      return distance < 250
    },
    true: () => ({ state: 'aware', animation: Sprite.resetAnimation() }),
    false: () => ({}),
  }),
  chasing: () => ({
    test: ({ instance, target }) => {
      const distance = length(subtract(target.position, instance.position))
      return distance >= 250
    },
    true: () => ({ state: 'idle', animation: Sprite.resetAnimation() }),
    false: () => ({
      test: ({ instance, target }) => {
        const distance = length(subtract(target.position, instance.position))
        return distance < 10
      },
      true: () => ({ state: 'sleepy', animation: Sprite.resetAnimation() }),
      false: () => ({}),
    }),
  }),
  sleepy: wakeUp,
  sleeping: wakeUp,
}

export default {
  types: {
    ...mouseType(),

    cat: {
      sprite: {
        src: 'neko',
        width: 192,
        height: 192,
        rows: 6,
        cols: 6,
        scale: 2,
        speed: 0.2,
        states: {
          idle: {
            frames: [[4, 0]],
          },

          aware: {
            frames: [
              [0, 0],
              [4, 0],
            ],
          },

          leftUp: {
            frames: [
              [5, 3],
              [5, 4],
            ],
            flip: 'h',
          },
          up: {
            frames: [
              [4, 4],
              [0, 5],
            ],
          },
          rightUp: {
            frames: [
              [5, 3],
              [5, 4],
            ],
          },
          right: {
            frames: [
              [4, 2],
              [4, 3],
            ],
          },
          rightDown: {
            frames: [
              [1, 2],
              [2, 2],
            ],
          },
          down: {
            frames: [
              [1, 0],
              [0, 1],
            ],
          },
          leftDown: {
            frames: [
              [1, 2],
              [2, 2],
            ],
            flip: 'h',
          },
          left: {
            frames: [
              [4, 2],
              [4, 3],
            ],
            flip: 'h',
          },

          sleepy: {
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

          sleeping: {
            frames: [
              [2, 4],
              [2, 4],
              [3, 4],
              [3, 4],
            ],
          },
        },
      },

      states: {
        idle: {
          'game:update'(instance, event, options) {
            const { instances } = options

            instance.sprite = 'idle'

            merge(
              instance,
              decide(whichState, {
                instance,
                target: instances.mouse,
              })
            )
            Sprite.animate(instance, options)
          },
        },

        aware: {
          'game:update'(instance, event, options) {
            instance.sprite = 'aware'
            Sprite.animate(instance, options)
          },

          'sprite:animationEnd'(instance, event) {
            const { id, sprite } = event.payload

            // always check who originated the event and which sprite is running!
            if (id === 'neko' && sprite === 'aware') {
              instance.state = 'chasing'
              instance.animation = Sprite.resetAnimation()
            }
          },
        },

        chasing: {
          'game:update'(instance, event, options) {
            const { instances } = options

            const target = instances.mouse

            merge(instance, arrive(instance, target, options))

            Sprite.move8(instance, target)

            merge(
              instance,
              decide(whichState, {
                instance,
                target: instances.mouse,
              })
            )
            Sprite.animate(instance, options)
          },
        },

        sleepy: {
          'game:update'(instance, event, options) {
            const { instances } = options

            instance.sprite = 'sleepy'

            merge(
              instance,
              decide(whichState, {
                instance,
                target: instances.mouse,
              })
            )
            Sprite.animate(instance, options)
          },

          'sprite:animationEnd'(instance, event) {
            const { id, sprite } = event.payload

            if (id === 'neko' && sprite === 'sleepy') {
              instance.state = 'sleeping'
              instance.animation = Sprite.resetAnimation()
            }
          },
        },

        sleeping: {
          'game:update'(instance, event, options) {
            const { instances } = options

            instance.sprite = 'sleeping'

            merge(
              instance,
              decide(whichState, {
                instance,
                target: instances.mouse,
              })
            )
            Sprite.animate(instance, options)
          },
        },
      },

      draw: Sprite.draw,
    },
  },

  state: {
    instances: {
      ...mouseInstance(),

      neko: {
        type: 'cat',
        state: 'idle',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
