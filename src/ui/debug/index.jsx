import { useSelector } from 'react-redux'

const ONE_SECOND = 1

export default function Debug({ id }) {
  const elapsed = useSelector((state) => state.entities.elapsed)
  const entity = useSelector((state) => state.entities[id])

  return (
    <div>
      FPS: {elapsed != null ? ONE_SECOND / elapsed.value : '-'}
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
