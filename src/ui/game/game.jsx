import { withAbsolutePosition } from '@ezpz/ui/hocs/with-absolute-position'
import { useSelector } from 'react-redux'

import Character from './character'
import Button from './controls/button'
import Field from './controls/field'
import Form from './controls/form'
import Input from './controls/input'
import Label from './controls/label'
import Cursor from './cursor'
import Fps from './fps'
import Scene from './scene'
import Sprite from './sprite'

const Components = {
  mouse: withAbsolutePosition(Cursor),
  fps: withAbsolutePosition(Fps),
  button: withAbsolutePosition(Button),
  character: withAbsolutePosition(Character),
  input: withAbsolutePosition(Input),
  label: withAbsolutePosition(Label),
  field: withAbsolutePosition(Field),
  form: withAbsolutePosition(Form),
  sprite: withAbsolutePosition(Sprite),
}

export default function Game({ engine }) {
  const instances = useSelector((state) => state.instances) // don't use engine.instances: need to subscribe to animate scene!

  return (
    <Scene config={engine.config}>
      {Object.entries(instances).map(([id, instance]) => {
        const type = engine.config.types?.[instance.type]
        const Component = type?.sprite
          ? Components.sprite
          : Components[instance.type]

        if (!Component) {
          return null
        }

        return (
          <Component
            key={id}
            id={id}
            config={engine.config}
            type={type}
            instance={instance}
          />
        )
      })}
    </Scene>
  )
}
