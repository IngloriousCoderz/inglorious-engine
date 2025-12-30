import { toHTML } from "./html.js"
import { getModuleName } from "./module.js"

export async function renderPage(store, pageModule, options) {
  const name = getModuleName(pageModule)
  const api = store._api
  const entity = api.getEntity(name)

  if (pageModule.load) {
    await pageModule.load(entity, store._api)
  }

  const title =
    typeof pageModule.title === "function"
      ? pageModule.title(entity, api)
      : pageModule.title
  const meta =
    typeof options.meta === "function"
      ? options.meta(entity, api)
      : options.meta
  const scripts = pageModule.scripts
  const styles = pageModule.styles

  return toHTML(store, (api) => api.render(name, { allowType: true }), {
    ...options,
    title,
    meta,
    scripts,
    styles,
  })
}
