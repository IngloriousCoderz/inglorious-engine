import * as Character from '@inglorious/ui/canvas/character.js'

export default {
  types: {
    character: {
      draw: Character.draw,
    },
  },

  state: {
    instances: {
      instance1: {
        type: 'character',
        position: [400, 0, 300],
      },
    },
  },
}
