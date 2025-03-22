import Game from '@inglorious/ui/react/game/index.jsx'

import bounds from './bounds.js'
import codeReuse from './code-reuse.js'
import empty from './empty.js'
import eventHandlers from './event-handlers.js'
import framerate from './framerate.js'
import instances from './instances.js'

export default {
  title: 'Engine',
  component: Game,
  parameters: {
    layout: 'centered',
  },
}

export const Empty = {
  args: { config: empty },
}

export const Bounds = {
  args: { config: bounds },
}

export const Instances = {
  args: { config: instances },
}

export const EventHandlers = {
  args: { config: eventHandlers },
}

export const CodeReuse = {
  args: { config: codeReuse },
}

export const Framerate = {
  args: { config: framerate },
}
