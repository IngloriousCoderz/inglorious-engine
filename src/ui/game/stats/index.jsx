import { toString } from '@inglorious/utils/math/linear-algebra/vector'

const DECIMALS = 1

export default function Stats({ instance, instances }) {
  const { acceleration, velocity, position, orientation, ay, vy, py } =
    instances[instance.target]

  return (
    <>
      {acceleration && <div>Acceleration: {toString(acceleration)}</div>}
      {velocity && <div>Velocity: {toString(velocity)}</div>}
      {position && <div>Position: {toString(position)}</div>}
      {orientation != null && (
        <div>Orientation: {orientation.toFixed(DECIMALS)}</div>
      )}

      {ay != null && <div>ay: {ay.toFixed(DECIMALS)}</div>}
      {vy != null && <div>vy: {vy.toFixed(DECIMALS)}</div>}
      {py != null && <div>py: {py.toFixed(DECIMALS)}</div>}
    </>
  )
}
