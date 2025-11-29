import { createStore } from "@inglorious/lit"

import { app } from "../app"
import { productList } from "../product-list/product-list"
import { entities } from "./entities"
import { middlewares } from "./middlewares"

export const store = createStore({
  types: { app, productList },
  entities,
  middlewares,
})
