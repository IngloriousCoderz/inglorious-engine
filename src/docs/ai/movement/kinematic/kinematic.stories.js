import Game from '@inglorious/ui/game'

import align from './align'
import arrive from './arrive'
import doubleJump from './double-jump'
import flee from './flee'
import jump from './jump'
import move from './move'
import seek from './seek'
import tankControls from './tank-controls'
import wander from './wander'
import wanderAsSeek from './wander-as-seek'

export default {
  title: 'Engine/AI/Movement/Kinematic',
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

export const WanderAsSeek = {
  args: { config: wanderAsSeek },
}

export const Align = {
  args: { config: align },
}

export const Move = {
  args: { config: move },
}

export const TankControls = {
  args: { config: tankControls },
}

export const Jump = {
  args: { config: jump },
}

export const DoubleJump = {
  args: { config: doubleJump },
}
