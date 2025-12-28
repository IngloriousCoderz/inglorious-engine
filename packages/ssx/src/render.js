import { toHTML } from "./html.js"
import { getModuleName } from "./module.js"
import { store } from "./store.js"

export function renderPage(pageModule, options) {
  const name = getModuleName(pageModule)

  store.notify("morph", { name, type: pageModule[name] })
  // store.notify("add", { id: name, type: name })

  return toHTML(store, (api) => api.render(name), {
    ...options,
    ...pageModule,
  })
}
