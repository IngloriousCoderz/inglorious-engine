export function generateMain() {
  return `import "/lit-loader.js"
await import("/app.js")
`
}
