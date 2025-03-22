import draw from '@inglorious/ui/canvas/character.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

const DEFAULT_PARAMS = {
  onState: 'default',
}

export function enableCharacter(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  return (type) => ({
    ...type,

    states: {
      ...type.states,

      [params.onState]: {
        draw,
      },
    },
  })
}
