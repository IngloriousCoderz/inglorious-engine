import { toHTML } from "./html.js"
import { store } from "./store.js"

const RESERVED = ["meta", "getStaticPaths", "getData"]

export function renderPage(pageModule, options) {
  // Find the export that looks like an entity (has render method)
  const name = Object.keys(pageModule).find((key) => {
    if (RESERVED.includes(key)) return false
    const value = pageModule[key]
    return (
      value && typeof value === "object" && typeof value.render === "function"
    )
  })

  if (!name) {
    throw new Error(
      "Page module must export an entity with a render() method. " +
        `Found exports: ${Object.keys(pageModule).join(", ")}`,
    )
  }

  store.notify("morph", { name, type: pageModule[name] })
  store.notify("add", { id: name, type: name })

  return toHTML(store, (api) => api.render(name), {
    ...options,
    ...pageModule,
  })
}
