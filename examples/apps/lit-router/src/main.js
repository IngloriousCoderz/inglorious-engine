import { mount } from "@inglorious/lit"
import { app } from "./app"
import { store } from "./store"

mount(store, app.render, document.getElementById("root"))
