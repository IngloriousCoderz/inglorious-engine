import Game from '@inglorious/ui/game'

import align from './align'
import arrive from './arrive'
import evade from './evade'
import face from './face'
import flee from './flee'
import lookWhereYoureGoing from './look-where-youre-going'
import matchVelocity from './match-velocity'
import pursue from './pursue'
import seek from './seek'
import wander from './wander'

export default {
  title: 'Engine/AI/Movement/Steering',
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

export const MatchVelocity = {
  args: { config: matchVelocity },
}

export const Pursue = {
  args: { config: pursue },
}

export const Evade = {
  args: { config: evade },
}

export const Face = {
  args: { config: face },
}

export const LookWhereYoureGoing = {
  name: "Look Where You're Going",
  args: { config: lookWhereYoureGoing },
}

export const Wander = {
  args: { config: wander },
}
