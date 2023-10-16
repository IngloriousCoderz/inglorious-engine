import { toString } from '@ezpz/utils/math/linear-algebra/vector'

const DECIMALS = 1

export default function Stats({ instance, instances }) {
  const target = instances[instance.target]

  return (
    <>
      <div>Acceleration: {toString(target.acceleration)}</div>
      <div>Velocity: {toString(target.velocity)}</div>
      <div>Position: {toString(target.position)}</div>

      {target.ay != null && <div>ay: {target.ay.toFixed(DECIMALS)}</div>}
      {target.vy != null && <div>max vy: {target.vy.toFixed(DECIMALS)}</div>}
      {target.py != null && <div>py: {target.py.toFixed(DECIMALS)}</div>}
    </>
  )
}
