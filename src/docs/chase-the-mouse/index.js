import arrive from '@ezpz/engine/ai/movement/kinematic/arrive'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { setEightSprite } from '@ezpz/utils/character/sprite'
import { merge } from '@ezpz/utils/data-structures/objects'
import { length } from '@ezpz/utils/math/linear-algebra/vector'
import { subtract } from '@ezpz/utils/math/linear-algebra/vectors'

import neko from './neko.png'

export default {
  types: {
    mouse: mouseType(),

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

            const target = instances.mouse
            const direction = subtract(target.position, instance.position)

            if (length(direction) < 250) {
              instance.state = 'aware'
            }
          },
        },

        aware: {
          'game:update'(instance) {
            instance.sprite = 'aware'
          },

          'sprite:animationEnd'(instance, event) {
            if (event.payload === 'aware') {
              instance.state = 'chasing'
            }
          },
        },

        chasing: {
          'game:update'(instance, event, { elapsed, instances }) {
            const target = instances.mouse

            setEightSprite(instance, target)

            merge(instance, arrive(instance, target, { elapsed }))

            const direction = subtract(target.position, instance.position)

            if (length(direction) >= 250) {
              instance.state = 'idle'
            } else if (length(direction) < 10) {
              instance.state = 'sleepy'
            }
          },
        },

        sleepy: {
          'game:update'(instance, event, { instances }) {
            instance.sprite = 'sleepy'

            const target = instances.mouse
            const direction = subtract(target.position, instance.position)

            if (length(direction) >= 10) {
              instance.state = 'aware'
            }
          },

          'sprite:animationEnd'(instance, event) {
            if (event.payload === 'sleepy') {
              instance.state = 'sleeping'
            }
          },
        },

        sleeping: {
          'game:update'(instance, event, { instances }) {
            instance.sprite = 'sleeping'

            const target = instances.mouse
            const direction = subtract(target.position, instance.position)

            if (length(direction) >= 10) {
              instance.state = 'aware'
            }
          },
        },
      },
    },
  },

  state: {
    instances: {
      mouse: mouseInstance(),

      neko: {
        type: 'cat',
        state: 'idle',
        maxSpeed: 250,
        orientation: 0,
        position: [400, 0, 300],
      },
    },
  },
}
