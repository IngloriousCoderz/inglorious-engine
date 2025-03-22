import Engine from "@inglorious/engine"
import { useEffect, useMemo, useState } from "react"
import { Provider } from "react-redux"

import GameComponent from "./game.jsx"

export default function Game({ config }) {
  const [isReady, setReady] = useState(false)

  const engine = useMemo(() => new Engine(config), [config])

  useEffect(() => {
    engine.start()
    setReady(true)
    window.engine = engine

    return () => engine.stop()
  }, [engine, config])

  if (!isReady) {
    return null
  }

  return (
    <Provider store={engine._store}>
      <GameComponent engine={engine} />
    </Provider>
  )
}
