import character from '@inglorious/utils/canvas/character.js'

export default {
  types: {
    character: {
      draw: character,
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
