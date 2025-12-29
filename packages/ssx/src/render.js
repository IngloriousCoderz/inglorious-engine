import { toHTML } from "./html.js"
import { getModuleName } from "./module.js"

export function renderPage(store, pageModule, options) {
  const name = getModuleName(pageModule)

  return toHTML(store, (api) => api.render(name, { allowType: true }), {
    ...options,
    ...pageModule,
  })
}
