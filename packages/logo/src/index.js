import { logo as logic } from "./handlers.js"
import { render } from "./render.js"

export const logo = { ...logic, render }

export { startInteraction, stopInteraction } from "./handlers.js"
