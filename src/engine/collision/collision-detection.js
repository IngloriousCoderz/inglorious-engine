import { intersectsCircle } from '@inglorious/utils/math/geometry/circle.js'
import { add } from '@inglorious/utils/math/linear-algebra/vectors.js'

export function collidesWith(instance, target, { config }) {
  const [defaultCollision] = config.types.character.collisions
  const instanceCircle = {
    ...defaultCollision,
    position: add(instance.position, defaultCollision.position),
  }
  const targetCircle = {
    ...defaultCollision,
    position: add(target.position, defaultCollision.position),
  }
  return intersectsCircle(instanceCircle, targetCircle)
}
