import {
  angle,
  createVector,
  multiply,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { sum } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { randomBinomial } from "@inglorious/utils/math/rng.js"

const DEFAULT_MAX_SPEED = 0
const DEFAULT_MAX_ANGULAR_SPEED = 0

const DEFAULT_ORIENTATION = 0

export default function wander(instance, { dt }) {
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED
  const maxAngularSpeed = instance.maxAngularSpeed ?? DEFAULT_MAX_ANGULAR_SPEED

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION
  orientation += randomBinomial() * maxAngularSpeed

  const velocity = createVector(maxSpeed, orientation)

  const position = sum(instance.position, multiply(velocity, dt))
  orientation = angle(velocity)

  return { velocity, position, orientation }
}
