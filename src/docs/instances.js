import { enableCharacter } from '@inglorious/game/decorators/character.js'

export default {
  types: {
    character: [enableCharacter()],
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
