import { createStore } from "@inglorious/store"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { types } from "./types"

export const store = createStore({ types, entities, middlewares })
