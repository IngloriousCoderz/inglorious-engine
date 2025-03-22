import draw from '@inglorious/ui/canvas/shapes/rectangle.js'

export function enablePlatform() {
  return (type) => ({
    ...type,

    draw,
  })
}
