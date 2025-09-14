import { Engine } from "@inglorious/engine/core/engine"
import { createRenderer } from "@inglorious/renderer-2d"
import { extend } from "@inglorious/utils/data-structures/objects"
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
      const renderer = createRenderer(canvasRef.current)
      engine = new Engine(renderer, config)
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
