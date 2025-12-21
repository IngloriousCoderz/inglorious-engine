import { createStore } from "@inglorious/web"

import { toHTML } from "./html"

export async function renderPage(pageModule, context) {
  const data = (await pageModule.getData?.(context)) ?? {}
  const storeConfig = pageModule.getStore(data)
  const store = createStore(storeConfig)

  const html = toHTML(pageModule.render, store)

  return {
    html,
    storeConfig,
    renderFn: pageModule.render,
  }
}
