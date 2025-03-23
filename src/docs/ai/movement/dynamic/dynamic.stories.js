import Game from "@inglorious/docs/game.jsx"

import align from "./align.js"
import arrive from "./arrive.js"
import evade from "./evade.js"
import face from "./face.js"
import flee from "./flee.js"
import lookWhereYoureGoing from "./look-where-youre-going.js"
import matchVelocity from "./match-velocity.js"
import pursue from "./pursue.js"
import seek from "./seek.js"
import wander from "./wander.js"

export default {
  title: "Engine/AI/Movement/Dynamic",
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
