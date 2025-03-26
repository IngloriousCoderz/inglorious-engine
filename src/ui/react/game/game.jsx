import { withAbsolutePosition } from "@inglorious/ui/react/hocs/with-absolute-position"
import { useSelector } from "react-redux"

import Character from "./character/index.jsx"
import Cursor from "./cursor/index.jsx"
import Form from "./form/index.jsx"
import Fps from "./fps/index.jsx"
import Platform from "./platform/index.jsx"
import Scene from "./scene/index.jsx"
import Sprite from "./sprite/index.jsx"
import Stats from "./stats/index.jsx"

const Components = {
  character: withAbsolutePosition(Character),
  mouse: withAbsolutePosition(Cursor),
  form: withAbsolutePosition(Form),
  fps: withAbsolutePosition(Fps),
  platform: withAbsolutePosition(Platform),
  sprite: withAbsolutePosition(Sprite),
  stats: withAbsolutePosition(Stats),
}

const Z = 2

export default function Game({ engine }) {
  // NOTE: don't use simply engine.instances here: need to subscribe to animate scene!
  const instances = useSelector((state) => state.instances)

  const types = engine._store.getTypes()
  const { mouse, ...rest } = instances
  const options = { types, instances }

  const draw = createDraw(options)

  return (
    <Scene instances={instances}>
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
    const { types, instances } = options
    const type = types[instance.type]

    const Component = type.sprite
      ? Components.sprite
      : Components[instance.type]

    return (
      <Component
        key={instance.id}
        id={instance.id}
        type={type}
        types={types}
        instance={instance}
        instances={instances}
      />
    )
  }
}
