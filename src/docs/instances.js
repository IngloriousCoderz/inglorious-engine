import * as Character from '@inglorious/game/types/character.js'

export default {
  types: {
    character: Character.type(),
  },

  state: {
    instances: {
      character: {
        id: 'character',
        type: 'character',
        position: [400, 0, 300],
      },
    },
  },
}
