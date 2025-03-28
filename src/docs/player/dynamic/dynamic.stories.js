import Game from "@inglorious/docs/game.jsx"

import doubleJump from "./double-jump.js"
import jump from "./jump.js"
import move from "./modern-controls.js"
import shooterControls from "./shooter-controls.js"
import tankControls from "./tank-controls.js"

export default {
  title: "Engine/Player/Dynamic",
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
