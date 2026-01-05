import { html } from "@inglorious/web"
import { render as ssrRender } from "@lit-labs/ssr"
import { collectResult } from "@lit-labs/ssr/lib/render-result.js"

import { layout as defaultLayout } from "./layout.js"

/**
 * Renders a page or component to HTML using the store state.
 * It handles SSR rendering of Lit templates and optional HTML wrapping.
 *
 * @param {Object} store - The application store instance.
 * @param {Function} renderFn - A function that returns a Lit template. Receives `api` as argument.
 * @param {Object} [options] - Rendering options.
 * @param {boolean} [options.wrap=false] - Whether to wrap the output in a full HTML document.
 * @param {Function} [options.layout] - Custom layout function.
 * @param {boolean} [options.stripLitMarkers=false] - Whether to remove Lit hydration markers (for static output).
 * @returns {Promise<string>} The generated HTML string.
 */
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
  return layout(finalHTML, options)
}

/**
 * Removes Lit hydration markers from the HTML string.
 * Useful for generating clean static HTML that doesn't need client-side hydration.
 *
 * @param {string} html - The HTML string with markers.
 * @returns {string} Cleaned HTML string.
 */
function stripLitMarkers(html) {
  return html
    .replace(/<!--\?[^>]*-->/g, "") // All lit-html markers
    .replace(/<!--\s*-->/g, "") // Empty comments
}

// TODO: this was copied from @inglorious/web, maybe expose it?
/**
 * Creates a render function bound to the store API.
 * This mimics the `api.render` behavior but for SSR context.
 *
 * @param {Object} api - The store API.
 * @returns {Function} The render function.
 */
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
