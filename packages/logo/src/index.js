import { logo as logic } from "./handlers"
import { render } from "./render"

export const logo = { ...logic, render }

export { startInteraction, stopInteraction } from "./handlers"
