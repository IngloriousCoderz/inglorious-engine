import hljs from "highlight.js"
import katex from "katex"
import MarkdownIt from "markdown-it"
import texmath from "markdown-it-texmath"

export function createMarkdownRenderer() {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      if (lang === "mermaid") {
        return `<div class="mermaid">${str}</div>`
      }
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (err) {
          console.error(err)
        }
      }
      return "" // use external default escaping
    },
  })

  // Add LaTeX support
  md.use(texmath, {
    engine: katex,
    delimiters: "dollars",
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
  })

  return md
}

export function renderMarkdown(markdown) {
  const md = createMarkdownRenderer()
  // Simple frontmatter stripping for runtime rendering (avoids Buffer/gray-matter on client)
  const content = markdown.replace(/^---[\s\S]*?---\n/, "")
  return md.render(content)
}

export function markdownPlugin(options = {}) {
  const { theme = "github-dark" } = options
  const md = createMarkdownRenderer()

  return {
    name: "ssx-markdown",
    enforce: "pre",
    async transform(code, id) {
      if (!id.endsWith(".md")) return

      const matter = (await import("gray-matter")).default
      const { content, data } = matter(code)
      const htmlContent = md.render(content)
      const hasMermaid =
        content.includes('class="mermaid"') || content.includes("```mermaid")

      let mermaidCode = ""
      if (hasMermaid) {
        mermaidCode = `
          import mermaid from "mermaid"
          if (typeof window !== "undefined") {
            mermaid.initialize({ startOnLoad: false })
          }
        `
      }

      return `
        import { html, unsafeHTML } from "@inglorious/web"
        import "katex/dist/katex.min.css"
        import "highlight.js/styles/${theme}.css"
        ${mermaidCode}

        export const metadata = ${JSON.stringify(data)}
        
        export default {
          render() {
            if (typeof window !== "undefined" && ${hasMermaid}) {
              setTimeout(() => {
                mermaid.run({ querySelector: ".mermaid" })
              }, 0)
            }
            return html\`<div class="markdown-body">\${unsafeHTML(${JSON.stringify(htmlContent)})}</div>\`
          }
        }
      `
    },
  }
}
