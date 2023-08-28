import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import engine from '../../engine'
import classes from './scene.module.scss'

export default function Scene({ children }) {
  const [width, height] = engine.config.dimensions

  const dispatch = useDispatch()

  const ref = useRef()

  useEffect(() => {
    ref.current.addEventListener('mousemove', ({ clientX, clientY }) =>
      dispatch({ id: 'mouse:move', payload: [clientX, 0, clientY] })
    )
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
