import draw from '@inglorious/ui/canvas/shapes/rectangle.js'

export function type(type) {
  return {
    draw,
    ...type,
  }
}
