# @inglorious/web

[![NPM version](https://img.shields.io/npm/v/@inglorious/web.svg)](https://www.npmjs.com/package/@inglorious/web)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, reactive-enough web framework built on **pure JavaScript**, the entity-based state management provided by **@inglorious/store**, and the DOM-diffing efficiency of **lit-html**.

Unlike modern frameworks that invent their own languages or rely on signals, proxies, or compilers, **@inglorious/web embraces plain JavaScript** and a transparent architecture.

---

## Features

- **Full-tree Re-rendering with DOM Diffing**  
  Your entire template tree re-renders on every state change, while **lit-html updates only the minimal DOM parts**.  
  No VDOM, no signals, no hidden dependencies.

- **Entity-Based Rendering Model**  
  Each entity type defines its own `render(entity, api)` method.  
  `api.render(id)` composes the UI by invoking the correct renderer for each entity.

- **Type Composition**  
  Types can be composed as arrays of behaviors, enabling reusable patterns like authentication guards, logging, or any cross-cutting concern.

- **Simple and Predictable API**  
  Zero magic, zero reactivity graphs, zero compiler.  
  Just JavaScript functions and store events.

- **Router, Forms, Tables, Virtual Lists**  
  High-level primitives built on the same predictable model.

- **Zero Component State**  
  All state lives in the store — never inside components.

- **No Signals, No Subscriptions, No Memory Leaks**  
  Because every render is triggered by the store, and lit-html handles the rest.

- **No compilation required**  
  Apps can run directly in the browser — no build/compile step is strictly necessary (though you may use bundlers or Vite for convenience in larger projects).

---

## Create App (scaffolding)

To help bootstrap projects quickly, there's an official scaffolding tool: **[`@inglorious/create-app`](https://www.npmjs.com/package/@inglorious/create-app)**. It generates opinionated boilerplates so you can start coding right away.

Available templates:

- **minimal** — plain HTML, CSS, and JS (no build step)
- **js** — Vite-based JavaScript project
- **ts** — Vite + TypeScript project

Use the scaffolder to create a starter app tailored to your workflow.

---

## Key Architectural Insight

### ✨ **Inglorious Web re-renders the whole template tree on each state change.**

Thanks to lit-html's optimized diffing, this is fast, predictable, and surprisingly efficient.

This means:

- **You do NOT need fine-grained reactivity**
- **You do NOT need selectors/signals/memos**
- **You do NOT track dependencies between UI fragments**
- **You cannot accidentally create memory leaks through subscriptions**

You get Svelte-like ergonomic simplicity, but with no compiler and no magic.

> "Re-render everything → let lit-html update only what changed."

It's that simple — and surprisingly fast in practice.

---

## When to Use Inglorious Web

- You want predictable behavior
- You prefer explicit state transitions
- You want to avoid complex reactive graphs
- You want UI to be fully controlled by your entity-based store
- You want to stay entirely in **JavaScript**, without DSLs or compilers
- You want **React-like declarative UI** but without the cost and overhead of React

This framework is ideal for both small apps and large business UIs.

--

## When NOT to Use Inglorious Web

- You need server-side rendering (SSR) or static site generation (SSG) - WIP
- You need fine-grained reactivity for very large datasets (1000+ items per view)
- You're building a library that needs to be framework-agnostic
- Your team is already deeply invested in React/Vue/Angular

---

## Why Inglorious Web Avoids Signals

Other modern frameworks use:

- Proxies (Vue)
- Observables (MobX)
- Fine-grained signals (Solid, Angular v17+)
- Compiler-generated reactivity (Svelte)
- Fiber or granular subscriptions (React, Preact, Qwik, etc.)

These systems are powerful but introduce:

- hidden dependencies
- memory retention risks
- unpredictable update ordering
- steep learning curves
- framework-specific languages
- need for cleanup, teardown, and special lifecycle APIs
- challenges when mixing with game engines, workers, or non-UI code

### Inglorious Web takes a different stance:

✔ **Every entity update is explicit**  
✔ **Every UI update is a full diff pass**  
✔ **Every part of the system is just JavaScript**  
✔ **No special lifecycle**  
✔ **No subscriptions needed**
✔ **No signals**  
✔ **No cleanup**  
✔ **No surprises**

This makes it especially suitable for:

- realtime applications
- hybrid UI/game engine contexts
- large enterprise apps where predictability matters
- developers who prefer simplicity over magic

---

# Comparison with Other Frameworks

Here's how @inglorious/web compares to the major players:

---

## **React**

| Feature                   | React                         | Inglorious Web                     |
| ------------------------- | ----------------------------- | ---------------------------------- |
| Rendering model           | VDOM diff + effects           | Full tree template + lit-html diff |
| Language                  | JSX (non-JS)                  | Pure JavaScript                    |
| Component state           | Yes                           | No — store only                    |
| Refs & lifecycles         | Many                          | None needed                        |
| Signals / fine reactivity | No (but heavy reconciliation) | No (rely on lit-html diff)         |
| Reconciliation overhead   | High (full VDOM diff)         | Low (template string diff)         |
| Bundle size               | Large                         | Tiny                               |
| Learning curve            | Medium/High                   | Very low                           |

React is powerful but complicated. Inglorious Web is simpler, lighter, and closer to native JS.

---

## **Vue (3)**

| Feature         | Vue                        | Inglorious Web                      |
| --------------- | -------------------------- | ----------------------------------- |
| Reactivity      | Proxy-based, deep tracking | Event-based updates + lit-html diff |
| Templates       | DSL                        | JavaScript templates                |
| Component state | Yes                        | No                                  |
| Lifecycle       | Many                       | None                                |
| Compiler        | Required for SFC           | None                                |

Vue reactivity is elegant but complex. Inglorious Web avoids proxies and keeps everything explicit.

---

## **Svelte**

| Feature        | Svelte                      | Inglorious Web     |
| -------------- | --------------------------- | ------------------ |
| Compiler       | Required                    | None               |
| Reactivity     | Compiler transforms $labels | Transparent JS     |
| Granularity    | Fine-grained                | Full-tree rerender |
| Learning curve | Medium                      | Low                |

Svelte is magic; Inglorious Web is explicit.

---

## **SolidJS**

| Feature    | Solid                | Inglorious Web     |
| ---------- | -------------------- | ------------------ |
| Reactivity | Fine-grained signals | No signals         |
| Components | Run once             | Rerun always       |
| Cleanup    | Required             | None               |
| Behavior   | Highly optimized     | Highly predictable |

Solid is extremely fast but requires a mental model.  
Inglorious Web trades peak performance for simplicity and zero overhead.

---

## **Qwik**

| Feature              | Qwik                 | Inglorious Web |
| -------------------- | -------------------- | -------------- |
| Execution model      | Resumable            | Plain JS       |
| Framework complexity | Very high            | Very low       |
| Reactivity           | Fine-grained signals | None           |

Qwik targets extreme performance at extreme complexity.  
Inglorious Web is minimal, predictable, and tiny.

---

## **HTMX / Alpine / Vanilla DOM**

You are closer philosophically to **HTMX** and **vanilla JS**, but with a declarative rendering model and entity-based state.

---

# Why Choose Inglorious Web

- Minimalistic
- Pure JavaScript
- Entity-based and predictable
- Extremely easy to reason about
- One render path, no hidden rules
- No reactivity graphs
- No per-component subscriptions
- No memory leaks
- No build step required (apps can run in the browser)
- Works perfectly in hybrid UI/game engine contexts
- Uses native ES modules and standards

If you want a framework that **does not fight JavaScript**, this is the one.

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

## Redux DevTools Integration

`@inglorious/web` ships with first-class support for the **Redux DevTools Extension**, allowing you to:

- inspect all store events
- time-travel through state changes
- restore previous states
- debug your entity-based logic visually

To enable DevTools, add the middleware provided by `createDevtools()`.

### 1. Create a `middlewares.js` file

```javascript
// middlewares.js
import { createDevtools } from "@inglorious/web"

export const middlewares = []

// Enable DevTools only in development mode
if (import.meta.env.DEV) {
  middlewares.push(createDevtools().middleware)
}
```

### 2. Pass middlewares when creating the store

```javascript
// store.js
import { createStore } from "@inglorious/web"
import { middlewares } from "./middlewares.js"

export const store = createStore({
  types,
  entities,
  middlewares,
})
```

Now your application state is fully visible in the Redux DevTools browser extension.

### What You'll See in DevTools

- Each event you dispatch via `api.notify(event, payload)` will appear as an action in the DevTools timeline.
- The entire store is visible under the _State_ tab.
- You can time-travel or replay events exactly like in Redux.

No additional configuration is needed.

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
      return html`<h1>User ${params?.id ?? "Unknown"} - ${entity.username}</h1>`
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

### 3. Programmatic Navigation

To navigate from your JavaScript code, dispatch a `navigate` event.

```javascript
api.notify("navigate", "/users/456")

// Or navigate back in history
api.notify("navigate", -1)

// With options
api.notify("navigate", {
  to: "/users/456",
  replace: true, // Replace current history entry
  force: true, // Force navigation even if path is identical (useful after logout)
})
```

### 4. Lazy Loading Routes

You can improve performance by lazy-loading routes. Instead of a string, provide a function that returns a dynamic import.

**Note:** The imported module must use a named export for the entity type (not `export default`), so the router can register it with a unique name in the store.

```javascript
// store.js
const entities = {
  router: {
    type: "router",
    routes: {
      "/": "homePage",
      // Lazy load: returns a Promise resolving to a module
      "/admin": () => import("./pages/admin.js"),
    },
  },
}
```

```javascript
// pages/admin.js
import { html } from "@inglorious/web"

// Must be a named export matching the type name you want to use
export const adminPage = {
  render: () => html`<h1>Admin Area</h1>`,
}
```

### 5. Route Guards (Type Composition)

Route guards are implemented using **type composition** — a powerful feature of `@inglorious/store` where types can be defined as arrays of behaviors that wrap and extend each other.

Guards are simply behaviors that intercept events (like `routeChange`) and can prevent navigation, redirect, or pass through to the protected page.

#### Example: Authentication Guard

```javascript
// guards/require-auth.js
export const requireAuth = (type) => ({
  routeChange(entity, payload, api) {
    // Only act when navigating to this specific route
    if (payload.route !== entity.type) return

    // Check authentication
    const user = localStorage.getItem("user")
    if (!user) {
      // Redirect to login, preserving the intended destination
      api.notify("navigate", {
        to: "/login",
        redirectTo: window.location.pathname,
        replace: true,
      })
      return
    }

    // User is authenticated - pass through to the actual page handler
    type.routeChange?.(entity, payload, api)
  },
})
```

#### Using Guards with Type Composition

```javascript
// store.js
import { createStore, router } from "@inglorious/web"
import { requireAuth } from "./guards/require-auth.js"
import { adminPage } from "./pages/admin.js"
import { loginPage } from "./pages/login.js"

const types = {
  router,

  // Public page - no guard
  loginPage,

  // Protected page - composed with requireAuth guard
  adminPage: [adminPage, requireAuth],
}

const entities = {
  router: {
    type: "router",
    routes: {
      "/login": "loginPage",
      "/admin": "adminPage",
    },
  },
  adminPage: {
    type: "adminPage",
  },
  loginPage: {
    type: "loginPage",
  },
}

export const store = createStore({ types, entities })
```

#### How Type Composition Works

When you define a type as an array like `[adminPage, requireAuth]`:

1. The behaviors compose in order (left to right)
2. Each behavior can intercept events before they reach the next behavior
3. Guards can choose to:
   - **Block** by returning early (not calling the next handler)
   - **Redirect** by triggering navigation to a different route
   - **Pass through** by calling the next behavior's handler

This pattern is extremely flexible and can be used for:

- **Authentication** - Check if user is logged in
- **Authorization** - Check user roles or permissions
- **Analytics** - Log page views
- **Redirects** - Redirect logged-in users away from login page
- **Loading states** - Show loading UI while checking async permissions
- **Any cross-cutting concern** you can think of

#### Multiple Guards

You can compose multiple guards for fine-grained control:

```javascript
const types = {
  // Require authentication AND admin role
  adminPage: [adminPage, requireAuth, requireAdmin],

  // Require authentication AND resource ownership
  userProfile: [userProfile, requireAuth, requireOwnership],
}
```

Guards execute in order, so earlier guards can block navigation before later guards even run.

---

## Type Composition

One of the most powerful features of `@inglorious/store` (and therefore `@inglorious/web`) is **type composition**. Types can be defined as arrays of behaviors that wrap each other, enabling elegant solutions to cross-cutting concerns.

### Basic Composition

```javascript
const logging = (type) => ({
  // Intercept the render method
  render(entity, api) {
    console.log(`Rendering ${entity.id}`)
    return type.render(entity, api)
  },

  // Intercept any event
  someEvent(entity, payload, api) {
    console.log(`Event triggered on ${entity.id}`)
    type.someEvent?.(entity, payload, api)
  },
})

const types = {
  // Compose the counter type with logging
  counter: [counterBase, logging],
}
```

### Use Cases

Type composition enables elegant solutions for:

- **Route guards** - Authentication, authorization, redirects
- **Logging/debugging** - Trace renders and events
- **Analytics** - Track user interactions
- **Error boundaries** - Catch and handle render errors gracefully
- **Loading states** - Show spinners during async operations
- **Caching/memoization** - Cache expensive computations
- **Validation** - Validate entity state before operations
- **Any cross-cutting concern**

The composition pattern keeps your code modular and reusable without introducing framework magic.

---

## Table

`@inglorious/web` includes a `table` type for displaying data in a tabular format. It's designed to be flexible and customizable.

### 1. Add the `table` type

To use it, import the `table` type and its CSS, then create an entity for your table. You must define the `data` to be displayed and can optionally provide `columns` definitions.

```javascript
// In your entity definition file
import { table } from "@inglorious/web"

// Import base styles and a theme. You can create your own theme.
import "@inglorious/web/table/base.css"
import "@inglorious/web/table/theme.css"

export default {
  ...table,
  data: [
    { id: 1, name: "Product A", price: 100 },
    { id: 2, name: "Product B", price: 150 },
  ],
  columns: [
    { id: "id", label: "ID" },
    { id: "name", label: "Product Name" },
    { id: "price", label: "Price" },
  ],
}
```

### 2. Custom Rendering

You can customize how data is rendered in the table cells by overriding the `renderValue` method. This is useful for formatting values or displaying custom content.

The example below from `examples/apps/web-table/src/product-table/product-table.js` shows how to format values based on a `formatter` property in the column definition.

```javascript
import { table } from "@inglorious/web"
import { format } from "date-fns"

const formatters = {
  isAvailable: (val) => (val ? "✔️" : "❌"),
  createdAt: (val) => format(val, "dd/MM/yyyy HH:mm"),
}

export const productTable = {
  ...table,

  renderValue(value, column) {
    return formatters[column.formatter]?.(value) ?? value
  },
}
```

### 3. Theming

The table comes with a base stylesheet (`@inglorious/web/table/base.css`) and a default theme (`@inglorious/web/table/theme.css`). You can create your own theme by creating a new CSS file and styling the table elements to match your application's design.

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

---

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

The `renderFn` receives a powerful `api` object that contains all methods from the store's API (`getEntities`, `getEntity`, `notify`, etc.) plus special methods for the web package.

**`api.render(id, options?)`**

This method is the cornerstone of entity-based rendering. It looks up an entity by its `id`, finds its corresponding type definition, and calls the `render(entity, api)` method on that type. This allows you to define rendering logic alongside an entity's other behaviors.

### Re-exported `lit-html` Utilities

For convenience, `@inglorious/web` re-exports the most common utilities from `@inglorious/store` and `lit-html`, so you only need one import.

```javascript
import {
  // from @inglorious/store
  createStore,
  createDevtools,
  createSelector,
  // from @inglorious/store/test
  trigger,
  // from lit-html
  mount,
  html,
  render,
  svg,
  // lit-html directives
  choose,
  classMap,
  ref,
  repeat,
  styleMap,
  unsafeHTML,
  when,
  // router stuff
  router,
  // table stuff
  table,
  // form stuff
  form,
  getFieldError,
  getFieldValue,
  isFieldTouched,
  // virtualized list stuff
  list,
} from "@inglorious/web"
```

---

## Error Handling

When an entity's `render()` method throws an error, it can crash your entire app since the whole tree re-renders.

**Best practice:** Wrap your render logic in try-catch at the entity level:

```javascript
const myType = {
  render(entity, api) {
    try {
      // Your render logic
      return html`<div>...</div>`
    } catch (error) {
      console.error("Render error:", error)
      return html`<div class="error">Failed to render ${entity.id}</div>`
    }
  },
}
```

---

## Performance Tips

1. **Keep render() pure** - No side effects, no API calls
2. **Avoid creating new objects in render** - Use entity properties, not inline `{}`
3. **Use `repeat()` directive for lists** - Helps lit-html track item identity
4. **Profile with browser DevTools** - Look for slow renders (>16ms)
5. **Consider virtualization** - Use `list` type for 1000+ items

If renders are slow:

- Move expensive computations to event handlers
- Cache derived values on the entity
- ...Or memoize them!

---

## Relationship to Inglorious Engine

`@inglorious/web` shares its architectural philosophy with [Inglorious Engine](https://www.npmjs.com/package/@inglorious/engine):

- **Same state management** - Both use `@inglorious/store`
- **Same event system** - Entity behaviors respond to events
- **Same rendering model** - Full-state render on every update

The key difference:

- **@inglorious/engine** targets game loops (60fps, Canvas/WebGL rendering)
- **@inglorious/web** targets web UIs (DOM rendering, user interactions)

You can even mix them in the same app!

---

## Examples

Check out these demos to see `@inglorious/web` in action:

- **[Web TodoMVC](https://github.com/IngloriousCoderz/inglorious-forge/tree/main/examples/apps/web-todomvc)** - A client-only TodoMVC implementation, a good starting point for learning the framework.
- **[Web TodoMVC-CS](https://github.com/IngloriousCoderz/inglorious-forge/tree/main/examples/apps/web-todomvc-cs)** - A client-server version with JSON server, showing async event handlers and API integration with component organization (render/handlers modules).
- **[Web Form](https://github.com/IngloriousCoderz/inglorious-forge/tree/main/examples/apps/web-form)** - Form handling with validation, arrays, and field helpers.
- **[Web List](https://github.com/IngloriousCoderz/inglorious-forge/tree/main/examples/apps/web-list)** - Virtualized list with `renderItem` helper for efficient rendering of large datasets.
- **[Web Table](https://github.com/IngloriousCoderz/inglorious-forge/tree/main/examples/apps/web-table)** - Table component with complex data display patterns.
- **[Web Router](https://github.com/IngloriousCoderz/inglorious-forge/tree/main/examples/apps/web-router)** - Entity-based client-side routing with hash navigation.

---

## License

**MIT License - Free and open source**

Created by [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

You're free to use, modify, and distribute this software. See [LICENSE](./LICENSE) for details.

---

## Contributing

Contributions welcome! Please read our [Contributing Guidelines](../../CONTRIBUTING.md) first.
