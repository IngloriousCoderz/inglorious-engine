import { transformAsync } from "@babel/core"
import syntaxJsx from "@babel/plugin-syntax-jsx"
import syntaxTs from "@babel/plugin-syntax-typescript"

const AFTER_ON = 2

/**
 * Vite plugin to transform JSX into lit-html templates for @inglorious/web.
 *
 * @returns {import('vite').Plugin} The Vite plugin instance.
 */
export function jsx() {
  return {
    name: "@inglorious/vite-plugin-jsx",

    async transform(code, id) {
      if (!/\.[jt]sx$/.test(id)) return null

      const result = await transformAsync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        plugins: [syntaxJsx, [syntaxTs, { isTSX: true }], jsxToLit()],
        sourceMaps: true,
      })

      return result && { code: result.code, map: result.map }
    },
  }
}

/* -------------------------------------------- */

/**
 * Babel plugin factory that traverses the AST to transform JSX elements.
 *
 * @returns {import('@babel/core').PluginObj} The Babel visitor object.
 */
function jsxToLit() {
  return {
    visitor: {
      Program: {
        enter(path) {
          path.__needsHtml = false
        },
        exit(path) {
          if (!path.__needsHtml) return

          path.unshiftContainer("body", {
            type: "ImportDeclaration",
            source: { type: "StringLiteral", value: "@inglorious/web" },
            specifiers: [
              {
                type: "ImportSpecifier",
                imported: { type: "Identifier", name: "html" },
                local: { type: "Identifier", name: "html" },
              },
            ],
          })
        },
      },

      JSXElement(path) {
        path.findParent((p) => p.isProgram()).__needsHtml = true
        path.replaceWith(buildTemplate(path.node))
      },

      JSXFragment(path) {
        path.findParent((p) => p.isProgram()).__needsHtml = true
        path.replaceWith(buildFragment(path.node))
      },
    },
  }
}

/* -------------------------------------------- */

/**
 * Converts a JSXElement node into a lit-html TaggedTemplateExpression.
 *
 * @param {import('@babel/types').JSXElement} node - The JSX element node.
 * @returns {import('@babel/types').TaggedTemplateExpression} The transformed node.
 */
function buildTemplate(node) {
  const tag = node.openingElement.name.name
  let text = `<${tag}`
  const quasis = []
  const exprs = []

  for (const attr of node.openingElement.attributes) {
    let name = attr.name.name
    const value = attr.value

    if (name === "className") name = "class"

    if (name.startsWith("on")) {
      quasis.push(tpl(`${text} @${name.slice(AFTER_ON).toLowerCase()}=`))
      exprs.push(value.expression)
      text = ""
      continue
    }

    if (!value) {
      text += ` ${name}`
      continue
    }

    if (value.type === "JSXExpressionContainer") {
      // Use property binding (.) only if it's not a standard attribute or kebab-case
      const prefix =
        name.includes("-") || name === "class" || name === "id" ? "" : "."
      quasis.push(tpl(`${text} ${prefix}${name}=`))
      exprs.push(value.expression)
      text = ""
      continue
    }

    text += ` ${name}="${value.value}"`
  }

  text += ">"

  for (const child of node.children) {
    if (child.type === "JSXText") {
      text += child.value
    } else if (child.type === "JSXExpressionContainer") {
      quasis.push(tpl(text))
      exprs.push(child.expression)
      text = ""
    } else {
      quasis.push(tpl(text))
      exprs.push(
        child.type === "JSXFragment"
          ? buildFragment(child)
          : buildTemplate(child),
      )
      text = ""
    }
  }

  text += `</${tag}>`
  quasis.push(tpl(text, true))

  return {
    type: "TaggedTemplateExpression",
    tag: { type: "Identifier", name: "html" },
    quasi: { type: "TemplateLiteral", quasis, expressions: exprs },
  }
}

/**
 * Converts a JSXFragment node into a lit-html TaggedTemplateExpression.
 *
 * @param {import('@babel/types').JSXFragment} node - The JSX fragment node.
 * @returns {import('@babel/types').TaggedTemplateExpression} The transformed node.
 */
function buildFragment(node) {
  let text = ""
  const quasis = []
  const exprs = []

  for (const child of node.children) {
    if (child.type === "JSXText") {
      text += child.value
    } else if (child.type === "JSXExpressionContainer") {
      quasis.push(tpl(text))
      exprs.push(child.expression)
      text = ""
    } else {
      quasis.push(tpl(text))
      exprs.push(
        child.type === "JSXFragment"
          ? buildFragment(child)
          : buildTemplate(child),
      )
      text = ""
    }
  }

  quasis.push(tpl(text, true))

  return {
    type: "TaggedTemplateExpression",
    tag: { type: "Identifier", name: "html" },
    quasi: { type: "TemplateLiteral", quasis, expressions: exprs },
  }
}

/**
 * Helper to create a Babel TemplateElement node.
 *
 * @param {string} raw - The raw string content of the template part.
 * @param {boolean} [tail=false] - Whether this is the last part of the template.
 * @returns {import('@babel/types').TemplateElement} The template element node.
 */
function tpl(raw, tail = false) {
  return { type: "TemplateElement", value: { raw, cooked: raw }, tail }
}
