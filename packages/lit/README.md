# @inglorious/lit

[![NPM version](https://img.shields.io/npm/v/@inglorious/lit.svg)](https://www.npmjs.com/package/@inglorious/lit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight web framework that combines the entity-based state management of **@inglorious/store** with the performance and simplicity of **lit-html**.

---

## Features

- **Seamless Integration**: A simple `mount` function to connect your store, templates, and the DOM.
- **Efficient Rendering**: Leverages the performance of `lit-html` for DOM updates.
- **Entity-Based Rendering**: Includes a powerful `api.render(id)` helper to render individual entities based on their type.
- **Convenient Re-exports**: Provides direct access to `lit-html`'s `html`, `svg`, and core directives.
- **Fully Typed**: Strong TypeScript support for a great developer experience.

---

## Installation

```bash
npm install @inglorious/lit
```

---

## Quick Start

### 1. Define Your Store and Entity Renders

First, set up your store with entity types. For each type you want to render, add a render method that returns a `lit-html` template.

```javascript
// store.js
import { createStore, html } from "@inglorious/lit"

const types = {
  counter: {
    increment(entity) {
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
  counter1: { id: "counter1", type: "counter", value: 0 },
  counter2: { id: "counter2", type: "counter", value: 10 },
}

export const store = createStore({ types, entities })
```

### 2. Create Your Root Template and Mount

Write a root rendering function that uses the provided api to compose the UI, then use `mount` to attach it to the DOM.

```javascript
// main.js
import { mount, html } from "@inglorious/lit"
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

For convenience, `@inglorious/lit` re-exports the most common utilities from `@inglorious/store` and `lit-html`, so you only need one import.

```javascript
import {
  createStore,
  creteDevtools,
  createSelector,
  mount,
  html,
  render,
  svg,
  classMap,
} from "@inglorious/lit"
```

---

## License

**MIT License - Free and open source**

Created by [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

You're free to use, modify, and distribute this software. See [LICENSE](./LICENSE) for details.

---

## Contributing

Contributions welcome! Please read our [Contributing Guidelines](../../CONTRIBUTING.md) first.
