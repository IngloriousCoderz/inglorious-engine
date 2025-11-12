import { createStore } from "@inglorious/store"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { types } from "./types"
import { createReactStore } from "@inglorious/react-store"

export const store = createStore({ types, entities, middlewares })

export const { Provider, useSelector, useNotify } = createReactStore(store)
