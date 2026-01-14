import { describe, expect, it } from "vitest"

import { jsx } from "."

describe("vite-plugin-jsx", () => {
  const plugin = jsx()

  // Helper to run the transform
  const transform = async (code, id = "test.tsx") => {
    const result = await plugin.transform(code, id)
    return result ? result.code : null
  }

  it("transforms basic JSX elements", async () => {
    const code = `export const App = () => <div>Hello World</div>`
    expect(await transform(code)).toMatchSnapshot()
  })

  it("injects the html import only when JSX is present", async () => {
    const codeWithJsx = `const a = <div />`
    const codeWithoutJsx = `const a = 10`

    const resultWith = await transform(codeWithJsx)
    const resultWithout = await transform(codeWithoutJsx)

    expect(resultWith).toContain("@inglorious/web")
    expect(resultWithout).not.toContain("@inglorious/web")
  })

  it("transforms className to class", async () => {
    const code = `<div className="container">Content</div>`
    expect(await transform(code)).toMatchSnapshot()
  })

  it("handles event listeners (@event syntax)", async () => {
    const code = `<button onClick={handleClick} onMouseOver={() => {}}>Click</button>`
    expect(await transform(code)).toMatchSnapshot()
  })

  it("handles boolean attributes", async () => {
    const code = `<input disabled checked readonly />`
    expect(await transform(code)).toMatchSnapshot()
  })

  it("distinguishes between properties (.) and attributes", async () => {
    const code = `
      const App = () => (
        <my-element
          id={id}
          class={cls}
          aria-label={label}
          data-test={test}
          someProp={value}
          complexData={obj}
        />
      )
    `
    // Expect: id, class, aria-label, data-test to be attributes
    // Expect: .someProp, .complexData to be properties
    expect(await transform(code)).toMatchSnapshot()
  })

  it("handles fragments", async () => {
    const code = `
      const List = () => (
        <>
          <li>A</li>
          <li>B</li>
        </>
      )
    `
    expect(await transform(code)).toMatchSnapshot()
  })

  it("handles nested expressions and elements", async () => {
    const code = `
      const App = () => <div>{show ? <span>Visible</span> : null}</div>
    `
    expect(await transform(code)).toMatchSnapshot()
  })

  it("transforms Array.map to repeat directive", async () => {
    const code = `
      const List = ({ items }) => (
        <ul>
          {items.map(item => <li>{item}</li>)}
        </ul>
      )
    `
    expect(await transform(code)).toMatchSnapshot()
  })

  it("transforms Array.map with key to keyed repeat directive", async () => {
    const code = `
      const List = ({ items }) => (
        <ul>
          {items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      )
    `
    expect(await transform(code)).toMatchSnapshot()
  })

  it("transforms ternary operators to when directive", async () => {
    const code = `
      const App = ({ isLoggedIn }) => (
        <div>{isLoggedIn ? <User /> : <Login />}</div>
      )
    `
    expect(await transform(code)).toMatchSnapshot()
  })

  it("transforms logical AND to when directive", async () => {
    const code = `
      const App = ({ show }) => (
        <div>{show && <Modal />}</div>
      )
    `
    expect(await transform(code)).toMatchSnapshot()
  })

  it("merges imports if @inglorious/web is already imported", async () => {
    const code = `
      import { html } from "@inglorious/web"
      const App = ({ show }) => <div>{show ? <A /> : <B />}</div>
    `
    const result = await transform(code)

    // Verify only one import statement exists
    const importCount = (result.match(/from "@inglorious\/web"/g) || []).length
    expect(importCount).toBe(1)
    expect(result).toMatchSnapshot()
  })

  it("throws error for missing event handler expression", async () => {
    const code = `<button onClick />`
    await expect(transform(code)).rejects.toThrow(
      "Event handler onClick must be an expression",
    )
  })

  it("throws error for string literal event handler", async () => {
    const code = `<button onClick="handleClick" />`
    await expect(transform(code)).rejects.toThrow(
      "Event handler onClick must be an expression",
    )
  })

  it("does not generate closing tag for void elements", async () => {
    const code = `<img src="image.png" />`
    expect(await transform(code)).toMatchSnapshot()
  })

  it("handles SVG self-closing tags correctly", async () => {
    const code = `
      const Icon = () => (
        <svg>
          <path d="M0 0h10v10H0z" />
          <circle cx="5" cy="5" r="5" />
        </svg>
      )
    `
    expect(await transform(code)).toMatchSnapshot()
  })

  it("expands self-closing non-void HTML tags", async () => {
    const code = `<div className="empty" />`
    expect(await transform(code)).toMatchSnapshot()
  })

  it("ignores empty expressions and comments", async () => {
    const code = `
      const App = () => (
        <div>
          {/* This is a comment */}
          {}
          <span>Content</span>
        </div>
      )
    `
    expect(await transform(code)).toMatchSnapshot()
  })
})
