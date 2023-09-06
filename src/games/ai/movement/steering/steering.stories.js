import Game from '../../../../ui/game'
import align from './align'
import arrive from './arrive'
import flee from './flee'
import seek from './seek'

export default {
  title: 'Games/AI/Movement/Steering',
  component: Game,
}

export const Seek = {
  args: { config: seek },
}

export const Flee = {
  args: { config: flee },
}

export const Arrive = {
  args: { config: arrive },
}

export const Align = {
  args: { config: align },
}