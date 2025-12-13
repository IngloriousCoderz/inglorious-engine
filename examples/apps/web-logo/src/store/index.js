import { createStore } from "@inglorious/web"

import { liveLogo } from "../components/live-logo"
import { logoForm } from "../components/logo-form"
import { entities } from "./entities"
import { middlewares } from "./middlewares"

export const store = createStore({
  types: { logoForm, liveLogo },
  entities,
  middlewares,
})
