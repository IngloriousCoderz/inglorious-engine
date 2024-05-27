import {
  intersectsCircle,
  intersectsRectangle,
} from '@inglorious/utils/math/geometry/point.js'

const Z = 2

const Target = {
  circle: intersectsCircle,
  rectangle: intersectsRectangle,
}

export function findCollision(point, options) {
  const { config, instances } = options
  return Object.values(instances)
    .filter(({ type }) => config.types[type].hitbox)
    .toSorted((a, b) => a.position[Z] - b.position[Z])
    .find((instance) => collides(point, instance, options))
}

function collides(point, instance, { config }) {
  const { hitbox } = config.types[instance.type]
  return Target[hitbox.shape](point, { ...hitbox, position: instance.position })
}
