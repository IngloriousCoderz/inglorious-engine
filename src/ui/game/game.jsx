import { withAbsolutePosition } from '@ezpz/ui/hocs/with-absolute-position'
import { useSelector } from 'react-redux'

import Character from './character'
import Button from './controls/button'
import Field from './controls/field'
import Form from './controls/form'
import Input from './controls/input'
import Label from './controls/label'
import Cursor from './cursor'
import Debug from './debug'
import Scene from './scene'

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

export default function Game({ engine }) {
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
