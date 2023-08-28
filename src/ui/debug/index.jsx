import { useSelector } from 'react-redux'

export default function Debug({ id }) {
  const elapsed = useSelector((state) => state.entities.elapsed)
  const entity = useSelector((state) => state.entities[id])

  return (
    <div>
      FPS: {elapsed != null ? 1000 / elapsed.value : '-'}
      <br />
      Elapsed: {elapsed?.value ?? '-'}
      <br />
      Position: {JSON.stringify(entity.position)}
      <br />
      Velocity: {JSON.stringify(entity.velocity)}
      <br />
      Orientation: {JSON.stringify(entity.orientation)}
    </div>
  )
}
