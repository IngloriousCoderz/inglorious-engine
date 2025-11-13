import { createStore } from "@inglorious/store"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { form } from "../form/form"
import { list } from "../list/list"
import { footer } from "../footer/footer"
import { createReactStore } from "@inglorious/react-store"

export const store = createStore({
  types: { form, list, footer },
  entities,
  middlewares,
})

export const { Provider, useSelector, useEntity, useNotify } =
  createReactStore(store)
