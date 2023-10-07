import Game from '../ui/game'
import bounce from './bounce'
import idle from './idle'

export default {
  title: 'Games',
  component: Game,
}

export const Idle = {
  args: { config: idle },
}

export const Bounce = {
  args: { config: bounce },
}
