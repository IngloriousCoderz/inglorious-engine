import Game from '../ui/game'
import bounce from './bounce'

export default {
  title: 'Games',
  component: Game,
}

export const Bounce = {
  args: { config: bounce },
}
