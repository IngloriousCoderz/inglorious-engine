import { html } from "@inglorious/web"
import { render as ssrRender } from "@lit-labs/ssr"
import { collectResult } from "@lit-labs/ssr/lib/render-result.js"

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

  return options.wrap ? wrapHTML(finalHTML, options) : finalHTML
}

function stripLitMarkers(html) {
  return html
    .replace(/<!--\?[^>]*-->/g, "") // All lit-html markers
    .replace(/<!--\s*-->/g, "") // Empty comments
}

function wrapHTML(body, options) {
  const { dev, title = "", meta = {}, styles = [], scripts = [] } = options

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  ${Object.entries(meta)
    .map(([name, content]) => `<meta name="${name}" content="${content}">`)
    .join("\n")}
  ${styles.map((href) => `<link rel="stylesheet" href="${href}">`).join("\n")}
</head>
<body>
  <div id="root">${body}</div>

  ${dev ? `<script type="module" src="/@vite/client"></script>` : ``}<script type="module" src="/main.js"></script>
  ${scripts.map((src) => `<script type="module" src="${src}"></script>`).join("\n")}
</body>
</html>`
}

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
