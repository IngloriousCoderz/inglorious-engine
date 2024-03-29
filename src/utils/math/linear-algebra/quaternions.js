import { times } from './vector'
import { cross, dot, sum } from './vectors'

export function combine(q1, q2) {
  const [s, ...v] = q1
  const [t, ...w] = q2

  return [s * t - dot(v, w), ...sum(times(w, s), times(v, t), cross(v, w))]
}
