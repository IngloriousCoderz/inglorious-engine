import { mount } from "@inglorious/web"
import "@inglorious/web/select/base.css"

import { app } from "./app.js"
import { store } from "./store/index.js"

mount(store, app.render, document.getElementById("root"))
