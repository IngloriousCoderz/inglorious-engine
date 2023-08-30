import { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'

import engine from '../engine'
import Button from './button'
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

const Components = {
  cursor: Cursor,
  elapsed: Debug,
  button: Button,
  character: Character,
}

function Game() {
  const instances = useSelector((state) => state.instances)

  return (
    <Scene>
      {Object.entries(instances).map(([id, instance]) => {
        const Component = Components[instance.type]

        if (!Component) {
          return null
        }

        return <Component key={id} id={id} instance={instance} />
      })}
    </Scene>
  )
}
