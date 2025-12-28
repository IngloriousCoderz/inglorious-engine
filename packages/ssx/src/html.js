import { mount } from "@inglorious/web"

export function toHTML(store, renderFn, options = {}) {
  const window = globalThis.window
  const document = window.document

  document.body.innerHTML = '<div id="root"></div>'
  const root = document.getElementById("root")

  mount(store, renderFn, root)
  store.update()

  const html = options.stripLitMarkers
    ? stripLitMarkers(root.innerHTML)
    : root.innerHTML

  window.close()

  return options.wrap ? wrapHTML(html, options) : html
}

function stripLitMarkers(html) {
  return html
    .replace(/<!--\?[^>]*-->/g, "") // All lit-html markers
    .replace(/<!--\s*-->/g, "") // Empty comments
}

function wrapHTML(body, options) {
  const { title = "", meta = {}, styles = [], scripts = [] } = options
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

  <script type="module" src="/main.js"></script>
  ${scripts.map((src) => `<script type="module" src="${src}"></script>`).join("\n")}
</body>
</html>`
}
