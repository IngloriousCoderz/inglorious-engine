import { track } from "@inglorious/engine/behaviors/input/mouse.js"
import { useRef } from "react"
import { useDispatch } from "react-redux"

import classes from "./scene.module.scss"

export default function Scene({ entities, children }) {
  const dispatch = useDispatch()

  const [gameWidth, gameHeight] = entities.game.size

  const ref = useRef()
  const mouseHandlers = track(ref.current, {
    notify: (type, payload) => dispatch({ type, payload }),
  })

  return (
    <div
      className={classes.scene}
      style={{ "--width": `${gameWidth}px`, "--height": `${gameHeight}px` }}
      ref={ref}
      {...mouseHandlers}
    >
      {children}
    </div>
  )
}
