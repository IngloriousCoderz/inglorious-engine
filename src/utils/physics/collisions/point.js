import {
  isPointInCircle,
  isPointInRectangle,
} from '@inglorious/utils/math/geometry.js'

const Z = 2

const Target = {
  circle: isPointInCircle,
  boundingBox: isPointInRectangle,
}

export function findCollision(point, options) {
  return Object.values(options.instances)
    .toSorted((a, b) => a.position[Z] - b.position[Z])
    .find((instance) => collides(point, instance, options))
}

function collides(point, instance, { config }) {
  const { hitbox } = config.types[instance.type]
  return Target[hitbox.type](point, { ...hitbox, position: instance.position })
}
