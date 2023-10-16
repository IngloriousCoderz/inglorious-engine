import { toString } from '@inglorious/utils/math/linear-algebra/vector'

const DECIMALS = 1

export default function Stats({ instance, instances }) {
  const { acceleration, velocity, position, ay, vy, py } =
    instances[instance.target]

  return (
    <>
      {acceleration && <div>Acceleration: {toString(acceleration)}</div>}
      {velocity && <div>Velocity: {toString(velocity)}</div>}
      {position && <div>Position: {toString(position)}</div>}

      {ay != null && <div>ay: {ay.toFixed(DECIMALS)}</div>}
      {vy != null && <div>max vy: {vy.toFixed(DECIMALS)}</div>}
      {py != null && <div>py: {py.toFixed(DECIMALS)}</div>}
    </>
  )
}
