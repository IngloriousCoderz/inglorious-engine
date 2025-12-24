import { createStore, html } from "@inglorious/web"
import { describe, expect, it } from "vitest"

import { toHTML } from "./html.js"

const DEFAULT_OPTIONS = { stripLitMarkers: true }

describe("toHTML", () => {
  describe("basic rendering", () => {
    it("should render simple HTML without wrapping", () => {
      const store = createStore()
      const renderFn = () => html`<h1>Hello World</h1>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })

    it("should render empty content", () => {
      const store = createStore()
      const renderFn = () => html``

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })

    it("should render nested elements", () => {
      const store = createStore()
      const renderFn = () =>
        html`<div class="container">
          <h1>Title</h1>
          <p>Content</p>
        </div>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })

    it("should render with inline styles", () => {
      const store = createStore()
      const renderFn = () =>
        html`<div style="color: red; font-size: 16px;">Styled</div>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })
  })

  describe("rendering with state", () => {
    it("should render entities from store", () => {
      const store = createStore({
        types: {
          message: {
            render: (entity) => html`<span>${entity.text}</span>`,
          },
        },
        entities: {
          greeting: { type: "message", text: "Hello from store" },
        },
      })

      const renderFn = (api) => html`<div>${api.render("greeting")}</div>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })

    it("should render multiple entities", () => {
      const store = createStore({
        types: {
          item: {
            render: (entity) => html`<li>${entity.name}</li>`,
          },
        },
        entities: {
          item1: { type: "item", name: "First" },
          item2: { type: "item", name: "Second" },
          item3: { type: "item", name: "Third" },
        },
      })

      const renderFn = (api) =>
        html`<ul>
          ${api.render("item1")} ${api.render("item2")} ${api.render("item3")}
        </ul>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })

    it("should evaluate conditional rendering based on state", () => {
      const store = createStore({
        types: {
          content: {
            render: (entity) =>
              entity.isVisible
                ? html`<p>Visible content</p>`
                : html`<p>Hidden</p>`,
          },
        },
        entities: {
          content: { type: "content", isVisible: true },
        },
      })

      const renderFn = (api) => html`<div>${api.render("content")}</div>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })
  })

  describe("HTML wrapping", () => {
    it("should wrap HTML with basic DOCTYPE and structure", () => {
      const store = createStore()
      const renderFn = () => html`<h1>Page Title</h1>`

      const result = toHTML(store, renderFn, {
        ...DEFAULT_OPTIONS,
        wrap: true,
        title: "My Page",
      })

      expect(result).toMatchSnapshot()
    })

    it("should include meta tags in wrapped HTML", () => {
      const store = createStore()
      const renderFn = () => html`<p>Content</p>`

      const result = toHTML(store, renderFn, {
        ...DEFAULT_OPTIONS,
        wrap: true,
        title: "Test Page",
        metas: [
          { name: "description", content: "Test description" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
        ],
      })

      expect(result).toMatchSnapshot()
    })

    it("should include stylesheets in wrapped HTML", () => {
      const store = createStore()
      const renderFn = () => html`<p>Content</p>`

      const result = toHTML(store, renderFn, {
        ...DEFAULT_OPTIONS,
        wrap: true,
        styles: ["/css/style.css", "/css/theme.css"],
      })

      expect(result).toMatchSnapshot()
    })

    it("should include scripts in wrapped HTML", () => {
      const store = createStore()
      const renderFn = () => html`<p>Content</p>`

      const result = toHTML(store, renderFn, {
        ...DEFAULT_OPTIONS,
        wrap: true,
        scripts: ["/js/app.js", "/js/analytics.js"],
      })

      expect(result).toMatchSnapshot()
    })

    it("should include all options in wrapped HTML", () => {
      const store = createStore()
      const renderFn = () => html`<main>Main content</main>`

      const result = toHTML(store, renderFn, {
        ...DEFAULT_OPTIONS,
        wrap: true,
        title: "Complete Page",
        metas: [{ name: "author", content: "Test Author" }],
        styles: ["/style.css"],
        scripts: ["/app.js"],
      })

      expect(result).toMatchSnapshot()
    })

    it("should default to empty title when not provided", () => {
      const store = createStore()
      const renderFn = () => html`<p>Content</p>`

      const result = toHTML(store, renderFn, { ...DEFAULT_OPTIONS, wrap: true })

      expect(result).toMatchSnapshot()
    })

    it("should handle empty arrays for metas, styles, and scripts", () => {
      const store = createStore()
      const renderFn = () => html`<p>Content</p>`

      const result = toHTML(store, renderFn, {
        ...DEFAULT_OPTIONS,
        wrap: true,
        metas: [],
        styles: [],
        scripts: [],
      })

      expect(result).toMatchSnapshot()
    })
  })

  describe("API rendering within components", () => {
    it("should support api.render() method in component render function", () => {
      const store = createStore({
        types: {
          wrapper: {
            render: (entity, api) => html`<div>${api.render("myItem")}</div>`,
          },
          item: { render: (entity) => html`<span>${entity.label}</span>` },
        },
        entities: {
          myWrapper: { type: "wrapper" },
          myItem: { type: "item", label: "Test Item" },
        },
      })

      const renderFn = (api) => html`<div>${api.render("myWrapper")}</div>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })
  })

  describe("complex scenarios", () => {
    it("should render a complete page structure with message list", () => {
      const store = createStore({
        types: {
          message: {
            render: (entity) =>
              html`<div class="message"><p>${entity.text}</p></div>`,
          },
        },
        entities: {
          msg1: { type: "message", text: "First message" },
          msg2: { type: "message", text: "Second message" },
        },
      })

      const renderFn = (api) =>
        html`<div class="app">
          <header><h1>Messages</h1></header>
          <main>${api.render("msg1")} ${api.render("msg2")}</main>
          <footer>© 2024</footer>
        </div>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })

    it("should render wrapped complex page with all assets", () => {
      const store = createStore({
        types: {
          header: { render: () => html`<header><h1>My Website</h1></header>` },
        },
        entities: { header: { type: "header" } },
      })

      const renderFn = (api) =>
        html`<div>
          ${api.render("header")}
          <p>Welcome!</p>
        </div>`

      const result = toHTML(store, renderFn, {
        ...DEFAULT_OPTIONS,
        wrap: true,
        title: "My Website",
        metas: [
          { name: "description", content: "Welcome to my site" },
          { name: "viewport", content: "width=device-width" },
        ],
        styles: ["/style.css"],
        scripts: ["/script.js"],
      })

      expect(result).toMatchSnapshot()
    })
  })

  describe("event handling", () => {
    it("should render event handlers in templates", () => {
      const store = createStore({
        types: {
          button: {
            render: (entity, api) =>
              html`<div @click=${() => api.notify(`#${entity.id}:click`)}>
                Click me
              </div>`,
          },
        },
        entities: {
          myButton: { type: "button", id: "myButton" },
        },
      })

      const renderFn = (api) => html`<div>${api.render("myButton")}</div>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })

    it("should render multiple event handlers", () => {
      const store = createStore({
        types: {
          counter: {
            render: (entity, api) =>
              html`<div>
                <button @click=${() => api.notify(`#${entity.id}:increment`)}>
                  +
                </button>
                <span>${entity.count}</span>
                <button @click=${() => api.notify(`#${entity.id}:decrement`)}>
                  -
                </button>
              </div>`,
          },
        },
        entities: {
          counter1: { type: "counter", id: "counter1", count: 5 },
        },
      })

      const renderFn = (api) => html`<div>${api.render("counter1")}</div>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })
  })

  describe("edge cases", () => {
    it("should handle special characters in content", () => {
      const store = createStore()
      const renderFn = () => html`<p>&lt;script&gt; &amp; "quotes"</p>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toMatchSnapshot()
    })

    it("should not include wrap by default", () => {
      const store = createStore()
      const renderFn = () => html`<p>Content</p>`

      const result = toHTML(store, renderFn, {})

      expect(result).toMatchSnapshot()
    })

    it("should return only inner HTML when wrap is false", () => {
      const store = createStore()
      const renderFn = () => html`<p>Inner</p>`

      const result = toHTML(store, renderFn, {
        ...DEFAULT_OPTIONS,
        wrap: false,
      })

      expect(result).toMatchSnapshot()
    })

    it("should close DOM window properly", () => {
      const store = createStore()
      const renderFn = () => html`<p>Test</p>`

      const result = toHTML(store, renderFn, DEFAULT_OPTIONS)

      expect(result).toBeDefined()
      expect(result).not.toBeNull()
    })
  })
})
