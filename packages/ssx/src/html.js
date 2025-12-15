import { mount } from "@inglorious/web"
import { Window } from "happy-dom"

export function toHTML(store, renderFn, options = {}) {
  const window = new Window()
  const document = window.document
  document.body.innerHTML = '<div id="root"></div>'

  const root = document.getElementById("root")
  mount(store, renderFn, root)

  const html = stripLitMarkers(root.innerHTML)
  window.close()

  return options.wrap ? wrapHTML(html, options) : html
}

function stripLitMarkers(html) {
  return html
    .replace(/<!--\?[^>]*-->/g, "") // All lit-html markers
    .replace(/<!--\s*-->/g, "") // Empty comments
}

function wrapHTML(body, options) {
  const { title = "", metas = [], styles = [], scripts = [] } = options
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  ${metas.map((meta) => `<meta name="${meta.name}" content="${meta.content}">`).join("\n")}
  ${styles.map((href) => `<link rel="stylesheet" href="${href}">`).join("\n")}
</head>
<body>
  <div id="root">${body}</div>
  ${scripts.map((src) => `<script type="module" src="${src}"></script>`).join("\n")}
</body>
</html>`
}
