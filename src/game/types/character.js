import draw from '@inglorious/ui/canvas/character.js'

export function type(type) {
  return {
    draw,
    ...type,
  }
}
