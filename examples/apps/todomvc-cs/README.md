# Inglorious TodoMVC Demo (Client-Service)

This repository hosts a demonstration application that implements the classic TodoMVC using the **[@inglorious/react-store](https://www.npmjs.com/package/@inglorious/react-store)** and **[@inglorious/store](https://www.npmjs.com/package/@inglorious/store)** state management libraries, with **asynchronous operations** handled by a mocked RESTful service.

The goal of this demo is to showcase the pattern for integrating **async API calls** into the entity-based, event-driven architecture, highlighting the need for internal event management.

## ✨ Key Architectural Takeaways

In addition to the core entity and `notify` patterns, this demo emphasizes the proper way to handle server communication:

1. **Server Communication**: All task management is delegated to a separate, mocked RESTful API (run via `json-server`).

2. **Async State Transitions (The Event Chain)**:
   - Handlers in `types.js` are defined as `async` functions (e.g., `async formSubmit`) to handle network requests.
   - Once the network call is complete, the handler uses `api.notify()` to emit a **second, synchronous event** (e.g., `"taskCreated"`).
   - A dedicated synchronous handler (e.g., `taskCreated(entity, payload)`) then performs the state update. **This ensures all state updates remain pure.**

3. **Required Batched Mode (`mode: "batched"`)**:
   - Since asynchronous operations cause state events to be triggered outside of the initial event loop, the default **eager mode** would require manual `store.update()` calls.

   - The **`batched` mode** automatically calls `store.update()` at a fixed rate (≈30 times per second) to process any pending events. This ensures that the secondary events (like `taskCreated`) are regularly processed and reflected in the React UI without developers needing to manage explicit update calls.

## 🚀 Getting Started

This project was bootstrapped using `pnpm create vite@latest`.

### Prerequisites

You need a recent version of [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) (or npm/yarn).

### 1. Installation

```bash
# Clone the repository (if not already done)
git clone https:/github.com/IngloriousCoderz/inglorious-engine
cd examples/apps/todomvc-cs

# Install dependencies
pnpm install
```

### 2. Run the Mock API Server

The application relies on a RESTful API mock server for persistent data storage, powered by `json-server`.

```bash
# Starts the API server on http://localhost:3000
pnpm api
```

### 3. Run the Frontend Application

In a separate terminal window, start the React application:

```bash
pnpm dev
```

The application will launch on your local development server (typically `http://localhost:5173/`).

### 3. Build for Production

```bash
pnpm build
```

This will create a production-ready build in the `dist/` directory.

## 📁 Project Structure

### `src/store/index.js` (The Crucial Configuration)

This file sets the store to the necessary `batched` mode to handle the asynchronous API responses:

```javascript
// store/index.js

export const { Provider, useSelector, useNotify } = createReactStore(store, {
  // CRITICAL: This automatically processes the event queue at a 30 FPS rate,
  // ensuring the secondary, synchronous events (like tasksFetched) are handled
  // and do not require manual store.update() calls after async operations.
  mode: "batched",

  // Example of ignoring certain events in the Redux DevTools
  skippedEvents: ["create"],
})
// ...
```

### `src/store/types.js` (Async Handlers)

This file demonstrates the event-chaining pattern required for async operations:

```javascript
// types.js (Async Example)
import * as client from "../services/client"

export const types = {
  list: {
    async formSubmit(entity, value, api) {
      // 1. Perform async operation
      const createdTask = await client.createTask({ text: value })

      // 2. Report synchronous event to be processed in the next batched update
      api.notify("taskCreated", createdTask)
    },

    taskCreated(entity, createdTask) {
      // 3. Synchronous handler performs the state change
      entity.tasks.push(createdTask)
    },
    // ...
  },
  // ...
}
```
