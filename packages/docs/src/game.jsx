import { Engine } from "@inglorious/engine/core/engine"
import { Renderer2D } from "@inglorious/renderer-2d"
import { useEffect, useRef } from "react"

export default function Game({ config }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    let engine
    startEngine().then((e) => (engine = e))

    async function startEngine(engine) {
      const renderer = new Renderer2D(canvasRef.current)
      engine = new Engine({ ...config, renderer })
      await engine.init()
      engine.start()
      return engine
    }

    return () => {
      engine.stop()
    }
  }, [config])

  return <canvas id="canvas" ref={canvasRef} />
}
