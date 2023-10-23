import { useRef } from 'react'

import classes from './scene.module.scss'
import { useMouse } from './use-mouse'

export default function Scene({ config, children }) {
  const [, , width, height] = config.bounds

  const ref = useRef()
  const mouseEventHandlers = useMouse({ parent: ref.current, height })

  return (
    <div
      className={classes.scene}
      style={{ '--width': `${width}px`, '--height': `${height}px` }}
      {...mouseEventHandlers}
      ref={ref}
    >
      {children}
    </div>
  )
}
