# 🩸 @inglorious/vite-plugin-jsx

> **JSX without React. Deterministic UI for Inglorious Web.**

`@inglorious/vite-plugin-jsx` is a Vite plugin that compiles standard JSX / TSX into highly-optimized `lit-html` templates for **[@inglorious/web](https://www.npmjs.com/package/@inglorious/web)**.

It gives you React-familiar syntax **without** React's runtime, hooks, lifecycle, or reactivity model.

> New to Inglorious Web? Check out the [main documentation](https://www.npmjs.com/package/@inglorious/web) first.

---

## ✨ Features

- Standard JSX & TSX syntax
- Zero runtime overhead
- Compiles directly to `lit-html`
- Deterministic rendering model
- No hooks, no effects, no lifecycles
- First-class SVG support
- Automatic optimization of:
  - conditionals → `when()`
  - lists → `repeat()`
- Smart attribute & property binding
- Full TypeScript support

---

## 📦 Installation

```bash
npm install -D @inglorious/vite-plugin-jsx
```

---

## ⚡ Usage

### `vite.config.ts`

```ts
import { defineConfig } from "vite"
import { jsx } from "@inglorious/vite-plugin-jsx"

export default defineConfig({
  plugins: [jsx()],
})
```

That’s it.

You can now write JSX/TSX in your Inglorious project.

---

## 🧬 What It Compiles To

### JSX Input

```jsx
function render(entity, api) {
  return (
    <div className="card">
      {entity.visible && <h2>{entity.title}</h2>}

      {entity.items.map((item) => (
        <p key={item.id} onClick={() => api.notify("select", item)}>
          {item.name}
        </p>
      ))}
    </div>
  )
}
```

### Compiled Output

```js
function render(entity, api) {
  return html`
    <div class="card">
      ${when(entity.visible, () => html`<h2>${entity.title}</h2>`)}
      ${repeat(
        entity.items,
        (item) => item.id,
        (item) =>
          html`<p @click=${() => api.notify("select", item)}>${item.name}</p>`,
      )}
    </div>
  `
}
```

---

## 📚 Common Patterns

### Handling Events

```jsx
export const button = {
  render(entity, api) {
    return (
      <button onClick={() => api.notify(`#${entity.id}:click`)}>
        {entity.label}
      </button>
    )
  },
}
```

### Conditional Rendering

```jsx
export const panel = {
  render(entity, api) {
    return (
      <div>
        {entity.isLoading && <Spinner />}
        {entity.error ? (
          <ErrorMessage text={entity.error} />
        ) : (
          <Content data={entity.data} />
        )}
      </div>
    )
  },
}
```

### Lists with Keys

```jsx
export const todoList = {
  render(entity, api) {
    return (
      <ul>
        {entity.todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    )
  },
}
```

---

## 📘 TypeScript Support

The plugin works with `.tsx` files out of the box. For proper type checking:

```ts
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "preserve",           // Let Vite handle JSX transformation
    "jsxImportSource": undefined // Prevent automatic React imports
  }
}
```

For entity types with JSX renders:

```ts
import { html } from "@inglorious/web"

type CounterEntity = {
  type: "counter"
  value: number
}

export const counter = {
  render(entity: CounterEntity, api) {
    return (
      <div className="counter">
        <span>Count: {entity.value}</span>
      </div>
    )
  }
}
```

---

## 🧠 Design Philosophy

This plugin is **purely compile-time**.

It does **not** introduce:

- state
- hooks
- lifecycles
- effects
- subscriptions
- partial reactivity

JSX is treated as **syntax**, not as a runtime system.

The execution model of **@inglorious/web** remains untouched:

> store change → full deterministic render → diff → commit

---

## 🔁 JSX Rules & Semantics

### Event handlers

```jsx
<button onClick={save} />
```

→

```html
<button @click="${save}"></button>
```

---

### Property vs Attribute Binding

```jsx
// Properties (use . prefix for custom elements and form controls)
<input value={x} />       // → .value=${x}
<my-element data={x} />   // → .data=${x}

// Attributes (standard HTML, kebab-case, or specific attributes)
<input id={x} />          // → id=${x}
<div data-id={x} />       // → data-id=${x}
<div class={x} />         // → class=${x}
```

---

### Conditionals

```jsx
{
  cond && <A />
}
{
  cond ? <A /> : <B />
}
```

→ compiled to `when()`

---

### Lists

```jsx
items.map((i) => <Row key={i.id} />)
```

→ compiled to `repeat()`

Keys are extracted automatically.

---

### Fragments

```jsx
<>
  <A />
  <B />
</>
```

Fully supported.

---

### SVG

Nested SVG trees are handled correctly, including `foreignObject`.

---

### Engine Components

Capitalized tags are treated as **Engine Components** and compiled to `api.render()` calls.

```jsx
export const app = {
  render() {
    // ☝️ Plugin auto-injects 'api' if you use components!
    return <Form id="f1" />
  },
}
```

→ `api.render("form", { id: "f1" })`

> 💡 **Smart injection**: The plugin automatically adds the `api` parameter to your render function when you use Engine Components in JSX. You don't need to add it manually!

#### ⚠️ Important Constraint

These engine components must:

- **not** contain children
- **not** represent DOM
- **not** try to be React

They are **render boundaries** for your engine.

```jsx
// ❌ DON'T DO THIS - Engine components don't support children
export const form = {
  render(entity, api) {
    return (
      <Form id="f1">
        <Field />
      </Form>
    )
  },
}

// ✅ DO THIS - Compose at the entity level instead
export const form = {
  render(entity, api) {
    return html`<form>${api.render("field", { formId: entity.id })}</form>`
  },
}
```

---

## 🧪 Why This Exists

React's runtime model is heavy, implicit, and hard to reason about at scale.

Inglorious Web is built on different principles:

- **Explicit data flow** - All state lives in the store
- **Deterministic rendering** - Same state always produces same output
- **Full-tree updates** - No dependency tracking, no hidden subscriptions
- **Predictable performance** - lit-html diffs everything, every time

This plugin lets you keep the ergonomics of JSX **without compromising the architecture**.

---

## 🧯 What This Plugin Does NOT Support (by design)

This plugin intentionally does **not** support:

- React hooks (useState, useEffect, etc.)
- Component-local state
- Lifecycle methods
- Context API
- Portals
- Fine-grained reactivity

**Why?** These features conflict with Inglorious Web's deterministic rendering model.

If you need these patterns, consider whether your state should live in the store instead, or use React directly.

---

## License

**MIT License - Free and open source**

Created by [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

You're free to use, modify, and distribute this software. See [LICENSE](./LICENSE) for details.
