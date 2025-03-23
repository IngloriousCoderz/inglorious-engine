import { start } from "@inglorious/ui/canvas"
import { useRef } from "react"
import { useEffect } from "react"

export default function Game({ config }) {
  const canvas = useRef()

  useEffect(() => {
    if (canvas.current) {
      start(config, canvas.current)
    }
  }, [config])

  return <canvas id="canvas" ref={canvas} />
}
