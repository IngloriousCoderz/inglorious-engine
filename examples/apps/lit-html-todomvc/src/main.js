import { render } from "lit-html"

import { app } from "./app"
import { store } from "./store"

store.subscribe(() =>
  render(app.render(store._api), document.getElementById("root")),
)

store.notify("init")
