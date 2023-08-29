import { useSelector } from 'react-redux'

const ONE_SECOND = 1

export default function Debug({ id }) {
  const elapsed = useSelector((state) => state.instances.elapsed)
  const instance = useSelector((state) => state.instances[id])

  return (
    <div>
      FPS: {elapsed != null ? ONE_SECOND / elapsed.value : '-'}
      <br />
      Elapsed: {elapsed?.value ?? '-'}
      <br />
      Position: {JSON.stringify(instance.position)}
      <br />
      Velocity: {JSON.stringify(instance.velocity)}
      <br />
      Orientation: {JSON.stringify(instance.orientation)}
    </div>
  )
}
