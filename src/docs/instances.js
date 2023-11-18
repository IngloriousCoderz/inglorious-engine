import * as Character from '@inglorious/ui/canvas/character.js'

export default {
  types: {
    ...Character.type(),
  },

  state: {
    instances: {
      ...Character.instance({
        id: 'character1',
        type: 'character',
        position: [400, 0, 300],
      }),
    },
  },
}
