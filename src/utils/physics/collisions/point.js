/* eslint-disable no-magic-numbers */

const Target = {
  circle: isWithinCircle,
}

export function findCollision(point, options) {
  return Object.values(options.instances)
    .toSorted((a, b) => a.position[2] - b.position[2])
    .find((instance) => collides(point, instance, options))
}

function collides(point, instance, { config }) {
  const { collision } = config.types[instance.type]
  return Target[collision.type](point, instance.position, collision)
}

function isWithinCircle(point, position, { radius }) {
  const [cx, , cz] = position
  const [x, , z] = point

  return (x - cx) ** 2 + (z - cz) ** 2 <= radius ** 2
}
