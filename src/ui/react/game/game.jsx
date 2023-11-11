import { withAbsolutePosition } from '@inglorious/ui/react/hocs/with-absolute-position'
import { useSelector } from 'react-redux'

import Character from './character'
import Cursor from './cursor'
import Form from './form'
import Fps from './fps'
import Scene from './scene'
import Sprite from './sprite'
import Stats from './stats'

const Components = {
  character: withAbsolutePosition(Character),
  form: withAbsolutePosition(Form),
  fps: withAbsolutePosition(Fps),
  // input: withAbsolutePosition(Input),
  mouse: withAbsolutePosition(Cursor),
  sprite: withAbsolutePosition(Sprite),
  stats: withAbsolutePosition(Stats),
}

export default function Game({ engine }) {
  // NOTE: don't use simply engine.instances here: need to subscribe to animate scene!
  const instances = useSelector((state) => state.instances)

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
            instances={instances}
          />
        )
      })}
    </Scene>
  )
}
