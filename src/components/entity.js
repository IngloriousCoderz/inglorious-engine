import { useSelector } from 'react-redux'

export default function Entity({ id }) {
  const entity = useSelector((state) =>
    state.entities.find((entity) => entity.id === id)
  )

  return (
    <div>
      {entity.x} {entity.y}
    </div>
  )
}
