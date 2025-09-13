import { Engine } from "@inglorious/engine/core/engine.js"
import { useEffect, useMemo, useState } from "react"
import { Provider } from "react-redux"

import GameComponent from "./game.jsx"

export default function Game({ config }) {
  const [isReady, setReady] = useState(false)

  const engine = useMemo(() => new Engine(config), [config])

  useEffect(() => {
    startEngine()

    async function startEngine() {
      await engine.init()
      engine.start()
      setReady(true)
      return engine
    }

    return () => engine.stop()
  }, [config])

  if (!isReady) {
    return null
  }

  return (
    <Provider store={engine._store}>
      <GameComponent engine={engine} />
    </Provider>
  )
}
