import { createStore } from "@inglorious/lit"

import { app } from "../app"
import { footer } from "../footer/footer"
import { form } from "../form/form"
import { list } from "../list/list"
import { entities } from "./entities"
import { middlewares } from "./middlewares"

export const store = createStore({
  types: { app, form, list, footer },
  entities,
  middlewares,
})
