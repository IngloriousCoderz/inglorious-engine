import Game from "@inglorious/docs/game.jsx"

import circles from "./circles.js"
import platform from "./platform.js"

export default {
  title: "Engine/Collision Detection",
  component: Game,
  parameters: { layout: "centered" },
}

export const Circles = {
  args: { config: circles },
}

export const Platform = {
  args: { config: platform },
}
