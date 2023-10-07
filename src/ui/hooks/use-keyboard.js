import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useKeyboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    const handleKeyDown = ({ code }) =>
      dispatch({ id: 'keyboard:keyDown', payload: code })
    const handleKeyUp = ({ code }) =>
      dispatch({ id: 'keyboard:keyUp', payload: code })

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [dispatch])
}
