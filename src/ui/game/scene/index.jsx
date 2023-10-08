import { useKeyboard } from '@ezpz/ui/hooks/use-keyboard'
import { useMouse } from '@ezpz/ui/hooks/use-mouse'
import { useRef } from 'react'

import classes from './scene.module.scss'

export default function Scene({ config, children }) {
  const [, , width, height] = config.bounds

  const ref = useRef()
  const mouseEventHandlers = useMouse({ parent: ref.current })
  useKeyboard()

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
