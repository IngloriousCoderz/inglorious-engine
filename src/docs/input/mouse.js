import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import character from '@inglorious/utils/canvas/character.js'

export default {
  types: {
    ...mouseType(),

    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, { instances }) {
        const { mouse } = instances
        instance.position = mouse.position
      },

      draw: character,
    },
  },

  state: {
    instances: {
      ...mouseInstance(),

      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
