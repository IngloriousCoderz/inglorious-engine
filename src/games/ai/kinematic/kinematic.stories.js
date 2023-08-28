import Game from '../../../ui/game'
import flee from './flee'
import seek from './seek'

export default {
  title: 'Games/AI/Movement/Kinematic',
  component: Game,
}
export const Seek = {
  args: { config: seek },
}

export const Flee = {
  args: { config: flee },
}
