import { useEffect, useMemo, useState } from 'react'
import { Provider, useSelector } from 'react-redux'

import Engine from '../engine'
import Character from './character'
import Button from './controls/button'
import Field from './controls/field'
import Form from './controls/form'
import Input from './controls/input'
import Label from './controls/label'
import Cursor from './cursor'
import Debug from './debug'
import { withAbsolutePosition } from './hocs/with-absolute-position'
import Scene from './scene'

export default function GameWrapper({ config }) {
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
      <Game engine={engine} />
    </Provider>
  )
}

const Components = {
  mouse: withAbsolutePosition(Cursor),
  elapsed: withAbsolutePosition(Debug),
  button: withAbsolutePosition(Button),
  character: withAbsolutePosition(Character),
  input: withAbsolutePosition(Input),
  label: withAbsolutePosition(Label),
  field: withAbsolutePosition(Field),
  form: withAbsolutePosition(Form),
}

function Game({ engine }) {
  const instances = useSelector((state) => state.instances) // don't use engine.instances: need to subscribe to animate scene!

  return (
    <Scene config={engine.config}>
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
