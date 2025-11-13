import { createStore } from "@inglorious/lit"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { form } from "../form/form"
import { list } from "../list/list"
import { footer } from "../footer/footer"
import { app } from "../app"

export const store = createStore({
  types: { app, form, list, footer },
  entities,
  middlewares,
})
