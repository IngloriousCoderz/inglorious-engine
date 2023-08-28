import { useEffect } from 'react'
import { useState } from 'react'
import { Provider } from 'react-redux'

import engine from '../engine'
import Character from './character'
import Cursor from './cursor'
import Debug from './debug'
import Scene from './scene'

if (import.meta.env.DEV) {
  window.store = engine.store
}

export default function Game({ config }) {
  const [isReady, setReady] = useState(false)
  useEffect(() => {
    engine.load(config)
    engine.start('nap') // TODO: put in config
    setReady(true)
  }, [config])

  if (!isReady) {
    return null
  }

  return (
    <Provider store={engine.store}>
      <Scene>
        <Cursor />
        <Debug id="neko" />
        <Character id="neko" />
      </Scene>
    </Provider>
  )
}
