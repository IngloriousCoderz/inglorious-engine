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
  mouse: withAbsolutePosition(Cursor),
  sprite: withAbsolutePosition(Sprite),
  stats: withAbsolutePosition(Stats),
}

const Z = 2

export default function Game({ engine }) {
  // NOTE: don't use simply engine.instances here: need to subscribe to animate scene!
  const instances = useSelector((state) => state.instances)

  const { config } = engine
  const { mouse, ...rest } = instances
  const options = { config, instances }

  const draw = createDraw(options)

  return (
    <Scene config={engine.config}>
      {Object.values(rest)
        .filter(({ position }) => position)
        .toSorted((a, b) => a.py - b.py || b.position[Z] - a.position[Z])
        .map(draw)}
      {mouse && draw(mouse)}
    </Scene>
  )
}

function createDraw(options) {
  return function Draw(instance) {
    const { config, instances } = options
    const type = config.types[instance.type]

    const Component = type.sprite
      ? Components.sprite
      : Components[instance.type]

    return (
      <Component
        key={instance.id}
        id={instance.id}
        config={config}
        instances={instances}
        type={type}
        instance={instance}
      />
    )
  }
}
