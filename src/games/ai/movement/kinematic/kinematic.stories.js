import Game from '@ezpz/ui/game'

import align from './align'
import arrive from './arrive'
import flee from './flee'
import seek from './seek'
import wander from './wander'

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

export const Arrive = {
  args: { config: arrive },
}

export const Wander = {
  args: { config: wander },
}

export const Align = {
  args: { config: align },
}
