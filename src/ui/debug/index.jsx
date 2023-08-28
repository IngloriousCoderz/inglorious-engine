import { useSelector } from 'react-redux'

import engine from '../../engine'

export default function Debug({ id }) {
  const fps = engine.config.fps
  const elapsed = useSelector((state) => state.entities.elapsed)
  const entity = useSelector((state) => state.entities[id])

  return (
    <div>
      FPS: {fps}
      <br />
      Elapsed: {elapsed.value}
      <br />
      Position: {JSON.stringify(entity.position)}
      <br />
      Velocity: {JSON.stringify(entity.velocity)}
      <br />
      Orientation: {JSON.stringify(entity.orientation)}
    </div>
  )
}
