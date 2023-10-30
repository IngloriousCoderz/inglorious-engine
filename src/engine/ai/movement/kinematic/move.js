import { angle, magnitude } from '@inglorious/utils/math/linear-algebra/vector'
import { applyVelocity } from '@inglorious/utils/physics/velocity'

const DEFAULT_ORIENTATION = 0

export default function move(instance, options) {
  const { velocity, position } = applyVelocity(instance, options)

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION
  orientation = magnitude(velocity) ? angle(velocity) : orientation

  return { velocity, position, orientation }
}
