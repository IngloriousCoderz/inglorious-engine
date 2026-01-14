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
})
