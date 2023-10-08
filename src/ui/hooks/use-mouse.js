import { useDispatch } from 'react-redux'

const CURSOR_SIZE = 20
const NO_Y = 0

export function useMouse({ parent }) {
  const notify = useDispatch()

  const onMouseMove = (event) => {
    if (parent == null) {
      return
    }

    const payload = calculatePosition({
      clientX: event.clientX,
      clientY: event.clientY,
      parent,
    })
    notify({ id: 'mouse:move', payload })
  }

  const onClick = (event) => {
    if (parent == null) {
      return
    }

    const payload = calculatePosition({
      clientX: event.clientX,
      clientY: event.clientY,
      parent,
    })
    notify({ id: 'mouse:click', payload })
  }

  return { onMouseMove, onClick }
}

function calculatePosition({ clientX, clientY, parent }) {
  const bounds = parent.getBoundingClientRect()
  const x = clientX - bounds.left + CURSOR_SIZE
  const z = clientY - bounds.top + CURSOR_SIZE

  return [x, NO_Y, z]
}
