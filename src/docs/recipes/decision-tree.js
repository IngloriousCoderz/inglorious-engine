import arrive from '@inglorious/engine/ai/movement/kinematic/arrive.js'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import * as Sprite from '@inglorious/ui/canvas/sprite.js'
import { decide } from '@inglorious/utils/algorithms/decision-tree.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { length } from '@inglorious/utils/math/linear-algebra/vector.js'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors.js'

// A reusable decision tree node
const wakeUp = () => ({
  test: ({ instance, target }) => {
    const distance = length(subtract(target.position, instance.position))
    return distance >= 10
  },
  true: ({ instance }) => {
    instance.state = 'aware'
    Sprite.init('aware', instance)
    return instance
  },
})

// Our decision tree
const nextState = {
  test: ({ instance }) => instance.state,
  idle: () => ({
    test: ({ instance, target }) => {
      const distance = length(subtract(target.position, instance.position))
      return distance < 250
    },
    true: ({ instance }) => {
      instance.state = 'aware'
      Sprite.init('aware', instance)
      return instance
    },
  }),
  chasing: () => ({
    test: ({ instance, target }) => {
      const distance = length(subtract(target.position, instance.position))
      return distance >= 250
    },
    true: ({ instance }) => {
      instance.state = 'idle'
      Sprite.init('idle', instance)
      return instance
    },
    false: () => ({
      test: ({ instance, target }) => {
        const distance = length(subtract(target.position, instance.position))
        return distance < 10
      },
      true: ({ instance }) => {
        instance.state = 'sleepy'
        Sprite.init('sleepy', instance)
        return instance
      },
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
            const { mouse } = options.instances

            Sprite.animate(instance, options)

            decide(nextState, { instance, target: mouse })
          },
        },

        aware: {
          'game:update'(instance, event, options) {
            Sprite.animate(instance, options)
          },

          'sprite:animationEnd'(instance, event) {
            const { id, sprite } = event.payload

            // always check who originated the event and which sprite is running!
            if (id === 'neko' && sprite === 'aware') {
              instance.state = 'chasing'
            }
          },
        },

        chasing: {
          'game:update'(instance, event, options) {
            const { mouse } = options.instances

            merge(instance, arrive(instance, mouse, options))

            instance.sprite = Sprite.move8(instance, mouse)
            Sprite.animate(instance, options)

            decide(nextState, { instance, target: mouse })
          },
        },

        sleepy: {
          'game:update'(instance, event, options) {
            const { mouse } = options.instances

            Sprite.animate(instance, options)

            decide(nextState, { instance, target: mouse })
          },

          'sprite:animationEnd'(instance, event) {
            const { id, sprite } = event.payload

            if (id === 'neko' && sprite === 'sleepy') {
              instance.state = 'sleeping'
              Sprite.init('sleeping', instance)
            }
          },
        },

        sleeping: {
          'game:update'(instance, event, options) {
            const { mouse } = options.instances

            Sprite.animate(instance, options)

            decide(nextState, { instance, target: mouse })
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
        sprite: 'idle',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
