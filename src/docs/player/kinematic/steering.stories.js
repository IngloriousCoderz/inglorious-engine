import Game from '@inglorious/ui/game'

import doubleJump from './double-jump'
import jump from './jump'
import move from './move'
import shooterControls from './shooter-controls'
import tankControls from './tank-controls'

export default {
  title: 'Engine/Player/Kinematic',
  component: Game,
}

export const Move = {
  args: { config: move },
}

export const Jump = {
  args: { config: jump },
}

export const DoubleJump = {
  args: { config: doubleJump },
}

export const TankControls = {
  args: { config: tankControls },
}

export const ShooterControls = {
  args: { config: shooterControls },
}
