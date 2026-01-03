export function layout(body, options) {
  const {
    lang = "en",
    charset = "UTF-8",
    title = "",
    meta = {},
    styles = [],
    head = "",
    scripts = [],
    isDev,
  } = options

  return `<!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="${charset}" />
        <title>${title}</title>
        ${Object.entries(meta)
          .map(
            ([name, content]) => `<meta name="${name}" content="${content}">`,
          )
          .join("\n")}
        ${styles
          .map((href) => `<link rel="stylesheet" href="${href}">`)
          .join("\n")}
        ${head}
      </head>
      <body>
        <div id="root">${body}</div>
        ${isDev ? `<script type="module" src="/@vite/client"></script>` : ``}
        <script type="module" src="/main.js"></script>
        ${scripts
          .map((src) => `<script type="module" src="${src}"></script>`)
          .join("\n")}
      </body>
    </html>`
}
