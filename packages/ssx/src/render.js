import { toHTML } from "./html.js"
import { getModuleName } from "./module.js"

export async function renderPage(store, page, module, options = {}) {
  const { title = "", meta = {}, scripts = [], styles = [] } = options

  const name = getModuleName(module)
  const api = store._api
  const entity = api.getEntity(name)

  if (module.load) {
    await module.load(entity, page, store._api)
  }

  const pageTitle = module.title
    ? typeof module.title === "function"
      ? module.title(entity, api)
      : module.title
    : title

  const pageMeta = {
    ...meta,
    ...(typeof module.meta === "function"
      ? module.meta(entity, api)
      : (module.meta ?? {})),
  }

  const pageScripts = [
    ...scripts,
    ...(typeof module.scripts === "function"
      ? module.scripts(entity, api)
      : (module.scripts ?? [])),
  ]
  const pageStyles = [
    ...styles,
    ...(typeof module.styles === "function"
      ? module.styles(entity, api)
      : (module.styles ?? [])),
  ]

  return toHTML(store, (api) => api.render(name, { allowType: true }), {
    ...options,
    title: pageTitle,
    meta: pageMeta,
    scripts: pageScripts,
    styles: pageStyles,
  })
}
