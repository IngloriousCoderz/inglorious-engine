import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function useKeyboard() {
  const notify = useDispatch()

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.stopPropagation()
      notify({ id: 'keyboard:keyDown', payload: event.code })
    }

    const handleKeyUp = (event) => {
      event.stopPropagation()
      notify({ id: 'keyboard:keyUp', payload: event.code })
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [notify])
}
