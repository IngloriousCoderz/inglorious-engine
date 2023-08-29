import { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'

import engine from '../engine'
import { selectInstances } from '../engine/store'
import Character from './character'
import Cursor from './cursor'
import Debug from './debug'
import Scene from './scene'

if (import.meta.env.DEV) {
  window.store = engine.store
}

export default function GameWrapper({ config }) {
  const [isReady, setReady] = useState(false)
  useEffect(() => {
    engine.load(config)
    engine.start()
    setReady(true)

    return () => engine.stop()
  }, [config])

  if (!isReady) {
    return null
  }

  return (
    <Provider store={engine.store}>
      <Game />
    </Provider>
  )
}

function Game() {
  const [cursor] = useSelector((state) => selectInstances(state, 'cursor'))
  const [elapsed] = useSelector((state) => selectInstances(state, 'elapsed'))
  const characters = useSelector((state) => selectInstances(state, 'character'))

  return (
    <Scene>
      {cursor && <Cursor instance={cursor} />}
      {elapsed && <Debug instance={elapsed} />}
      {characters.map((character, index) => (
        <Character key={index} instance={character} />
      ))}
    </Scene>
  )
}
