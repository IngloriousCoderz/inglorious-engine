import { Engine } from "@inglorious/engine/core/engine"
import { CanvasRenderer } from "@inglorious/renderers/canvas"
import { useEffect, useRef } from "react"

export default function Game({ config }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const renderer = new CanvasRenderer(canvasRef.current)
    const engine = new Engine({ ...config, renderer })
    engine.start()

    return () => {
      renderer.destroy()
      engine.stop()
    }
  }, [config])

  return <canvas id="canvas" ref={canvasRef} />
}
