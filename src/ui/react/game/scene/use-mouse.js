import { useDispatch } from 'react-redux'

const CURSOR_SIZE = 16
const NO_Y = 0

export function useMouse({ parent }) {
  const notify = useDispatch()

  const onMouseMove = (event) => {
    event.stopPropagation()

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
    event.stopPropagation()

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
  const z = bounds.bottom - clientY + CURSOR_SIZE

  return [x, NO_Y, z]
}
