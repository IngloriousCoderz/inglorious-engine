import arrive from '@inglorious/engine/ai/movement/kinematic/arrive'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { decide } from '@inglorious/utils/algorithms/decision-tree'
import { setEightSprite } from '@inglorious/utils/character/sprite'
import { merge } from '@inglorious/utils/data-structures/objects'
import { length } from '@inglorious/utils/math/linear-algebra/vector'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors'

import neko from './neko.png'

// A reusable decision tree node
const wakeUp = () => ({
  test: ({ instance, target }) => {
    const distance = length(subtract(target.position, instance.position))
    return distance >= 10
  },
  true: () => 'aware',
  false: ({ instance }) => instance.state,
})

// Our decision tree
const whichState = {
  test: ({ instance }) => instance.state,
  idle: () => ({
    test: ({ instance, target }) => {
      const distance = length(subtract(target.position, instance.position))
      return distance < 250
    },
    true: () => 'aware',
    false: ({ instance }) => instance.state,
  }),
  chasing: () => ({
    test: ({ instance, target }) => {
      const distance = length(subtract(target.position, instance.position))
      return distance >= 250
    },
    true: () => 'idle',
    false: () => ({
      test: ({ instance, target }) => {
        const distance = length(subtract(target.position, instance.position))
        return distance < 10
      },
      true: () => 'sleepy',
      false: ({ instance }) => instance.state,
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
        src: neko,
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
          'game:update'(instance, event, { instances }) {
            instance.sprite = 'idle'

            instance.state = decide(whichState, {
              instance,
              target: instances.mouse,
            })
          },
        },

        aware: {
          'game:update'(instance) {
            instance.sprite = 'aware'
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
          'game:update'(instance, event, { dt, instances }) {
            const target = instances.mouse

            setEightSprite(instance, target)

            merge(instance, arrive(instance, target, { dt }))

            instance.state = decide(whichState, {
              instance,
              target: instances.mouse,
            })
          },
        },

        sleepy: {
          'game:update'(instance, event, { instances }) {
            instance.sprite = 'sleepy'

            instance.state = decide(whichState, {
              instance,
              target: instances.mouse,
            })
          },

          'sprite:animationEnd'(instance, event) {
            const { id, sprite } = event.payload

            if (id === 'neko' && sprite === 'sleepy') {
              instance.state = 'sleeping'
            }
          },
        },

        sleeping: {
          'game:update'(instance, event, { instances }) {
            instance.sprite = 'sleeping'

            instance.state = decide(whichState, {
              instance,
              target: instances.mouse,
            })
          },
        },
      },
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
