import Game from '../ui/game'
import bounce from './bounce'
import bounds from './bounds'
import empty from './empty'
import eventHandlers from './event-handlers'
import instances from './instances'

export default {
  title: 'Games',
  component: Game,
  parameters: { layout: 'centered' },
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

export const Bounce = {
  args: { config: bounce },
}
