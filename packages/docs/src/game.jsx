import { Engine } from "@inglorious/engine/core/engine"
import { Renderer2D } from "@inglorious/renderer-2d"
import { useEffect, useRef } from "react"

export default function Game({ config }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const renderer = new Renderer2D(canvasRef.current)
    const engine = new Engine({ ...config, renderer })
    engine.start()

    return () => {
      renderer.destroy()
      engine.stop()
    }
  }, [config])

  return <canvas id="canvas" ref={canvasRef} />
}
