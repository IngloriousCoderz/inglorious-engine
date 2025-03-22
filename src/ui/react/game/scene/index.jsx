import { track } from "@inglorious/game/decorators/input/mouse.js"
import { useRef } from "react"
import { useDispatch } from "react-redux"

import classes from "./scene.module.scss"

export default function Scene({ config, children }) {
  const notify = useDispatch()

  const [, , width, height] = config.bounds

  const ref = useRef()
  const mouseHandlers = track(ref.current, { notify })

  return (
    <div
      className={classes.scene}
      style={{ "--width": `${width}px`, "--height": `${height}px` }}
      ref={ref}
      {...mouseHandlers}
    >
      {children}
    </div>
  )
}
