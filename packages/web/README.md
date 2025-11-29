# @inglorious/web

[![NPM version](https://img.shields.io/npm/v/@inglorious/web.svg)](https://www.npmjs.com/package/@inglorious/web)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight web framework that combines the entity-based state management of **@inglorious/store** with the performance and simplicity of **lit-html**.

---

## Features

- **Seamless Integration**: A simple `mount` function to connect your store, templates, and the DOM.
- **Efficient Rendering**: Leverages the performance of `lit-html` for DOM updates.
- **Entity-Based Rendering**: Includes a powerful `api.render(id)` helper to render individual entities based on their type.
- **Convenient Re-exports**: Provides direct access to `lit-html`'s `html`, `svg`, and core directives.
- **Client-Side Router**: A simple, entity-based router for single-page applications.
- **Fully Typed**: Strong TypeScript support for a great developer experience.

---

## Installation

```bash
npm install @inglorious/web
```

---

## Quick Start

### 1. Define Your Store and Entity Renders

First, set up your store with entity types. For each type you want to render, add a render method that returns a `lit-html` template.

```javascript
// store.js
import { createStore, html } from "@inglorious/web"

const types = {
  counter: {
    increment(entity, id) {
      if (entity.id !== id) return
      entity.value++
    },

    // Define how a 'counter' entity should be rendered
    render(entity, api) {
      return html`
        <div>
          <span>Count: ${entity.value}</span>
          <button @click=${() => api.notify("increment", entity.id)}>+1</button>
        </div>
      `
    },
  },
}

const entities = {
  counter1: { type: "counter", value: 0 },
  counter2: { type: "counter", value: 10 },
}

export const store = createStore({ types, entities })
```

### 2. Create Your Root Template and Mount

Write a root rendering function that uses the provided api to compose the UI, then use `mount` to attach it to the DOM.

```javascript
// main.js
import { mount, html } from "@inglorious/web"
import { store } from "./store.js"

// This function receives the API and returns a lit-html template
const renderApp = (api) => {
  const entities = Object.values(api.getEntities())

  return html`
    <h1>Counters</h1>
    ${entities.map((entity) => api.render(entity.id))}
  `
}

// Mount the app to the DOM
mount(store, renderApp, document.getElementById("root"))
```

The `mount` function subscribes to the store and automatically re-renders your template whenever the state changes.

---

## Client-Side Router

`@inglorious/web` includes a lightweight, entity-based client-side router. It integrates directly into your `@inglorious/store` state, allowing your components to reactively update based on the current URL.

### 1. Setup the Router

To enable the router, add it to your store's types and create a `router` entity. The entity's `routes` property maps URL patterns to the entity types that represent your pages.

```javascript
// store.js
import { createStore, html, router } from "@inglorious/web"

const types = {
  // 1. Add the router type to your store's types
  router,

  // 2. Define types for your pages
  homePage: {
    render: () => html`<h1>Welcome Home!</h1>`,
  },
  userPage: {
    render: (entity, api) => {
      // Access route params from the router entity
      const { params } = api.getEntity("router")
      return html`<h1>User ${params.id} - ${entity.username}</h1>`
    },
  },
  notFoundPage: {
    render: () => html`<h1>404 - Page Not Found</h1>`,
  },
}

const entities = {
  // 3. Create the router entity
  router: {
    type: "router",
    routes: {
      "/": "homePage",
      "/users/:id": "userPage",
      "*": "notFoundPage", // Fallback for unmatched routes
    },
  },
  userPage: {
    type: "userPage",
    username: "Alice",
  },
}

export const store = createStore({ types, entities })
```

### 2. Render the Current Route

In your root template, read the `route` property from the router entity and use `api.render()` to display the correct page.

```javascript
// main.js
import { mount, html } from "@inglorious/web"
import { store } from "./store.js"

const renderApp = (api) => {
  const { route } = api.getEntity("router") // e.g., "homePage" or "userPage"

  return html`
    <nav><a href="/">Home</a> | <a href="/users/123">User 123</a></nav>
    <main>${route ? api.render(route) : ""}</main>
  `
}

mount(store, renderApp, document.getElementById("root"))
```

The router automatically intercepts clicks on local `<a>` tags and handles browser back/forward events, keeping your UI in sync with the URL.

---

## Forms

`@inglorious/web` includes a small but powerful `form` type for managing form state inside your entity store. It offers:

- Declarative form state held on an entity (`initialValues`, `values`, `errors`, `touched`)
- Convenient helpers for reading field value/error/touched state (`getFieldValue`, `getFieldError`, `isFieldTouched`)
- Built-in handlers for field changes, blurs, array fields, sync/async validation and submission

### Add the `form` type

Include `form` in your `types` and create an entity for the form (use any id you like — `form` is used below for clarity):

```javascript
import { createStore, form } from "@inglorious/web"

const types = { form }

const entities = {
  form: {
    type: "form",
    initialValues: {
      name: "",
      email: "",
      addresses: [],
    },
  },
}

const store = createStore({ types, entities })
```

### How it works (events & helpers)

The `form` type listens for a simple set of events (target the specific entity id with `#<id>:<event>`):

- `#<id>:fieldChange` — payload { path, value, validate? } — set a field value and optionally run a single-field validator
- `#<id>:fieldBlur` — payload { path, validate? } — mark field touched and optionally validate on blur
- `#<id>:fieldArrayAppend|fieldArrayRemove|fieldArrayInsert|fieldArrayMove` — manipulate array fields
- `#<id>:reset` — reset the form to `initialValues`
- `#<id>:validate` — synchronous whole-form validation; payload { validate }
- `#<id>:validateAsync` — async whole-form validation; payload { validate }
- `#<id>:submit` — typically handled by your `form` type's `submit` method (implement custom behavior there)

Helpers available from the package let you read state from templates and field helper components:

- `getFieldValue(formEntity, path)` — read a nested field value
- `getFieldError(formEntity, path)` — read a nested field's error message
- `isFieldTouched(formEntity, path)` — check if a field has been touched

Form state includes helpful flags:

- `isPristine` — whether the form has changed from initial values
- `isValid` — whether the current form has no validation errors
- `isValidating` — whether async validation is in progress
- `isSubmitting` — whether submission is in progress
- `submitError` — an optional submission-level error message

### Simple example (from examples/apps/web-form)

Field components typically call `api.notify` and the `form` entity reacts accordingly. Example input field usage:

```javascript
// inside a field component render
@input=${(e) => api.notify(`#${entity.id}:fieldChange`, { path: 'name', value: e.target.value, validate: validateName })}
@blur=${() => api.notify(`#${entity.id}:fieldBlur`, { path: 'name', validate: validateName })}
```

Submissions and whole-form validation can be triggered from a `form` render:

```javascript
<form @submit=${() => { api.notify(`#form:validate`, { validate: validateForm }); api.notify(`#form:submit`) }}>
  <!-- inputs / buttons -->
</form>
```

For a complete, working demo and helper components look at `examples/apps/web-form` which ships with the repository.

---

## Virtualized lists

`@inglorious/web` provides a small virtualized `list` type to efficiently render very long lists by only keeping visible items in the DOM. The `list` type is useful when you need to display large datasets without paying the full cost of mounting every element at once.

Key features:

- Renders only the visible slice of items and positions them absolutely inside a scrolling container.
- Automatically measures the first visible item height when not provided.
- Efficient scroll handling with simple buffer controls to avoid visual gaps.

### Typical entity shape

When you add the `list` type to your store the entity can include these properties (the type will provide sensible defaults). Only `items` is required — all other properties are optional:

- `items` (Array) — the dataset to render.
- `visibleRange` ({ start, end }) — current visible slice indices.
- `viewportHeight` (number) — height of the scrolling viewport in pixels.
- `itemHeight` (number | null) — fixed height for each item (when null, the type will measure the first item and use an estimated height).
- `estimatedHeight` (number) — fallback height used before measurement.
- `bufferSize` (number) — extra items to render before/after the visible range to reduce flicker during scrolling.

### Events & methods

The `list` type listens for the following events on the target entity:

- `#<id>:scroll` — payload is the scrolling container; updates `visibleRange` based on scroll position.
- `#<id>:measureHeight` — payload is the container element; used internally to measure the first item and compute `itemHeight`.

It also expects the item type to export `renderItem(item, index, api)` so each visible item can be rendered using the project's entity-based render approach.

### Example

Minimal example showing how to extend the `list` type to create a domain-specific list (e.g. `productList`) and provide a `renderItem(item, index, api)` helper.

```javascript
import { createStore, html, list } from "@inglorious/web"

// Extend the built-in list type to render product items
const productList = {
  ...list,

  renderItem(item, index) {
    return html`<div class="product">
      ${index}: <strong>${item.name}</strong> — ${item.price}
    </div>`
  },
}

const types = { list: productList }

const entities = {
  products: {
    type: "list",
    items: Array.from({ length: 10000 }, (_, i) => ({
      name: `Product ${i}`,
      price: `$${i}`,
    })),
    viewportHeight: 400,
    estimatedHeight: 40,
    bufferSize: 5,
  },
}

const store = createStore({ types, entities })

// Render with api.render(entity.id) as usual — the list will call productList.renderItem for each visible item.
```

See `src/list.js` in the package for the implementation details and the `examples/apps/web-list` demo for a complete working example. In the demo the `productList` type extends the `list` type and provides `renderItem(item, index)` to render each visible item — see `examples/apps/web-list/src/product-list/product-list.js`.

### 3. Programmatic Navigation

To navigate from your JavaScript code, dispatch a `navigate` event.

```javascript
api.notify("navigate", "/users/456")

// Or navigate back in history
api.notify("navigate", -1)
```

## API Reference

**`mount(store, renderFn, element)`**

Connects a store to a `lit-html` template and renders it into a DOM element. It automatically handles re-rendering on state changes.

**Parameters:**

- `store` (required): An instance of `@inglorious/store`.
- `renderFn(api)` (required): A function that takes an `api` object and returns a `lit-html` `TemplateResult` or `null`.
- `element` (required): The `HTMLElement` or `DocumentFragment` to render the template into.

**Returns:**

- `() => void`: An `unsubscribe` function to stop listening to store updates and clean up.

### The `api` Object

The `renderFn` receives a powerful `api` object that contains all methods from the store's API (`getEntities`, `getEntity`, `notify`, etc.) plus a special `render(id)` method.

This `render(id)` method is the cornerstone of entity-based rendering. It looks up an entity by its `id`, finds its corresponding type definition, and calls the `render(entity, api)` method on that type. This allows you to define rendering logic alongside an entity's other behaviors.

### Re-exported `lit-html` Utilities

For convenience, `@inglorious/web` re-exports the most common utilities from `@inglorious/store` and `lit-html`, so you only need one import.

```javascript
import {
  createStore,
  creteDevtools,
  createSelector,
  mount,
  html,
  router,
  render,
  svg,
  classMap,
} from "@inglorious/web"
```

---

## License

**MIT License - Free and open source**

Created by [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

You're free to use, modify, and distribute this software. See [LICENSE](./LICENSE) for details.

---

## Contributing

Contributions welcome! Please read our [Contributing Guidelines](../../CONTRIBUTING.md) first.
