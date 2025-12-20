import "./style.css"
import "@inglorious/web/select/base.css"
import "@inglorious/web/select/theme.css"

import { mount } from "@inglorious/web"

import { app } from "./app.js"
import { store } from "./store/index.js"

mount(store, app.render, document.getElementById("root"))
