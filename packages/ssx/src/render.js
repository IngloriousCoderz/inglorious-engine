import { toHTML } from "./html.js"
import { store } from "./store.js"

export function renderPage(pageModule, options) {
  const [name] = Object.keys(pageModule)

  store.notify("morph", { name, type: pageModule[name] })
  store.notify("add", { id: name, type: name })

  return toHTML(store, (api) => api.render(name), options)
}
