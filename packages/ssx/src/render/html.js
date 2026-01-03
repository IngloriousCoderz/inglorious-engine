import { html } from "@inglorious/web"
import { render as ssrRender } from "@lit-labs/ssr"
import { collectResult } from "@lit-labs/ssr/lib/render-result.js"

import { layout as defaultLayout } from "./layout.js"

export async function toHTML(store, renderFn, options = {}) {
  const api = { ...store._api }
  api.render = createRender(api)

  // Generate the template
  const template = renderFn(api)

  // SSR render → HTML with hydration markers
  const result = ssrRender(template)
  const resultString = await collectResult(result)

  const finalHTML = options.stripLitMarkers
    ? stripLitMarkers(resultString)
    : resultString

  if (!options.wrap) return finalHTML

  const layout = options.layout ?? defaultLayout
  return options.wrap ? layout(finalHTML, options) : finalHTML
}

function stripLitMarkers(html) {
  return html
    .replace(/<!--\?[^>]*-->/g, "") // All lit-html markers
    .replace(/<!--\s*-->/g, "") // Empty comments
}

// TODO: this was copied from @inglorious/web, maybe expose it?
function createRender(api) {
  return function (id, options = {}) {
    const entity = api.getEntity(id)

    if (!entity) {
      const { allowType } = options
      if (!allowType) return ""

      const type = api.getType(id)
      if (!type?.render) {
        console.warn(`No entity or type found: ${id}`)
        return html`<div>Not found: ${id}</div>`
      }
      return type.render(api)
    }

    const type = api.getType(entity.type)
    if (!type?.render) {
      console.warn(`No render function for type: ${entity.type}`)
      return html`<div>No renderer for ${entity.type}</div>`
    }

    return type.render(entity, api)
  }
}
