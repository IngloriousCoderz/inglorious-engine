import engine from '@ezpz/engine'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import classes from './scene.module.scss'

const NO_Y = 0

export default function Scene({ children }) {
  const [, , width, height] = engine.config.bounds

  const dispatch = useDispatch()

  const ref = useRef()

  useEffect(() => {
    const scene = ref.current

    const handleMouseMove = ({ clientX, clientY }) =>
      dispatch({ id: 'mouse:move', payload: [clientX, NO_Y, clientY] })
    const handleKeyDown = ({ code }) =>
      dispatch({ id: 'keyboard:keyDown', payload: code })
    const handleKeyUp = ({ code }) =>
      dispatch({ id: 'keyboard:keyUp', payload: code })

    scene.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      scene.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [dispatch])

  return (
    <div
      className={classes.scene}
      style={{ '--width': `${width}px`, '--height': `${height}px` }}
      ref={ref}
    >
      {children}
    </div>
  )
}
