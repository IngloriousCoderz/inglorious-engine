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
  // Remove lit-html/hyperhtml marker comments and empty comment markers
  // Keep other comments intact.
  return html.replace(/<!--([\s\S]*?)-->/g, (match, inner) => {
    const content = inner.trim()
    // empty comment like <!----> or <!-- -->
    if (content === "" || content === "?") return ""
    // lit markers: lit-part, /lit-part, lit-node, ?lit$...$...
    if (
      content.startsWith("lit-part") ||
      content.startsWith("/lit-part") ||
      content.startsWith("lit-node") ||
      content.startsWith("?lit") ||
      /^lit-/.test(content)
    ) {
      return ""
    }
    return match
  })
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
