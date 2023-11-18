import Game from '@inglorious/ui/react/game'

import bounds from './bounds'
import codeReuse from './code-reuse'
import empty from './empty'
import eventHandlers from './event-handlers'
import framerate from './framerate'
import instances from './instances'

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
