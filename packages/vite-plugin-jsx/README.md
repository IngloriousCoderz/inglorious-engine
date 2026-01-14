# 🩸 @inglorious/vite-plugin-jsx

> **JSX without React. Deterministic UI for Inglorious Web.**

`@inglorious/vite-plugin-jsx` is a Vite plugin that compiles standard JSX / TSX into highly-optimized `lit-html` templates for **@inglorious/web**.

It gives you React-familiar syntax **without** React’s runtime, hooks, lifecycle, or reactivity model.

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
You can now write JSX in your Inglorious project.

---

## 🧬 What It Compiles To

### JSX Input

```jsx
function render(entity, api) {
  return (
    <div className="card">
      {entity.visible && <h2>{entity.title}</h2>}

      {entity.items.map((item) => (
        <p key={item.id} onClick={() => api.select(item)}>
          {item.name}
        </p>
      ))}
    </div>
  )
}
```

### Compiled Output (conceptual)

```js
html`
  <div class="card">
    ${when(entity.visible, () => html`<h2>${entity.title}</h2>`)}
    ${repeat(
      entity.items,
      (item) => item.id,
      (item) => html` <p @click=${() => api.select(item)}>${item.name}</p> `,
    )}
  </div>
`
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
<input value={x} />
```

→ `.value=${x}`

```jsx
<div data-id={x} />
```

→ `data-id=${x}`

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

## 🧪 Why This Exists

React’s runtime model is heavy, implicit, and hard to reason about at scale.

Inglorious Web is built on:

- explicit data flow
- deterministic rendering
- full-tree updates
- predictable performance

This plugin lets you keep the ergonomics of JSX **without compromising the architecture**.

---

## 🧯 Limitations (by design)

This plugin intentionally does **not** support:

- React hooks
- component state
- lifecycle APIs
- context
- portals
- partial reactivity

If you need those, React already exists.

---

## License

**MIT License - Free and open source**

Created by [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

You're free to use, modify, and distribute this software. See [LICENSE](./LICENSE) for details.
