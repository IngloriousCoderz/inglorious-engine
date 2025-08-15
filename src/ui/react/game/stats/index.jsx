import { toString } from "@inglorious/utils/math/linear-algebra/vector.js"

const DECIMALS = 1

export default function Stats({ instance, instances, className, style }) {
  const { acceleration, velocity, position, orientation, ay, vy } =
    instances[instance.target]

  return (
    <div className={className} style={style}>
      {acceleration && <div>Acceleration: {toString(acceleration)}</div>}
      {velocity && <div>Velocity: {toString(velocity)}</div>}
      {position && <div>Position: {toString(position)}</div>}
      {orientation != null && (
        <div>Orientation: {orientation.toFixed(DECIMALS)}</div>
      )}

      {ay != null && <div>ay: {ay.toFixed(DECIMALS)}</div>}
      {vy != null && <div>vy: {vy.toFixed(DECIMALS)}</div>}
    </div>
  )
}
