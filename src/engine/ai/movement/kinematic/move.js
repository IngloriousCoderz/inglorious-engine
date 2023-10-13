import {
  angle,
  magnitude,
  multiply,
} from '@ezpz/utils/math/linear-algebra/vector'
import { sum } from '@ezpz/utils/math/linear-algebra/vectors'

export const DEFAULT_TIME_TO_TARGET = 1

export default function move(instance, { elapsed }) {
  const position = sum(instance.position, multiply(instance.velocity, elapsed))
  const orientation = magnitude(instance.velocity)
    ? angle(instance.velocity)
    : instance.orientation

  return { position, orientation }
}
