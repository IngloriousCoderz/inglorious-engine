import { useRef } from 'react'

import { useKeyboard } from '../hooks/use-keyboard'
import { useMouse } from '../hooks/use-mouse'
import classes from './scene.module.scss'

export default function Scene({ config, children }) {
  const [, , width, height] = config.bounds

  const ref = useRef()
  useMouse({ parent: ref.current })
  useKeyboard()

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
