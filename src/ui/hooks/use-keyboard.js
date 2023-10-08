import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useKeyboard() {
  const notify = useDispatch()

  useEffect(() => {
    const handleKeyDown = ({ code }) =>
      notify({ id: 'keyboard:keyDown', payload: code })

    const handleKeyUp = ({ code }) =>
      notify({ id: 'keyboard:keyUp', payload: code })

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [notify])
}
