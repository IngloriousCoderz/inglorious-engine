import { mount } from "@inglorious/web"

import { store } from "./store/index.js"
import { app } from "./types/dashboard.js"

mount(store, app.render, document.getElementById("root"))
