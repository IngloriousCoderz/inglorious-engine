import { useSelector } from 'react-redux'

export default function Debug({ id }) {
  const entity = useSelector((state) => state.entities[id])

  return (
    <div>
      Position: {JSON.stringify(entity.position)}
      <br />
      Velocity: {JSON.stringify(entity.velocity)}
      <br />
      Orientation: {JSON.stringify(entity.orientation)}
    </div>
  )
}
