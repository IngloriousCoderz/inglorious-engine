import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const CURSOR_SIZE = 20
const NO_Y = 0

export function useMouse({ parent }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (parent == null) {
      return
    }

    const handleMouseMove = ({ clientX, clientY }) => {
      const bounds = parent.getBoundingClientRect()
      const x = clientX - bounds.left + CURSOR_SIZE
      const z = clientY - bounds.top + CURSOR_SIZE
      dispatch({ id: 'mouse:move', payload: [x, NO_Y, z] })
    }

    parent.addEventListener('mousemove', handleMouseMove)

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove)
    }
  }, [dispatch, parent])
}
