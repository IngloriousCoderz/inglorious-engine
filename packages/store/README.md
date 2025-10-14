# Inglorious Store

[![NPM version](https://img.shields.io/npm/v/@inglorious/store.svg)](https://www.npmjs.com/package/@inglorious/store)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Redux-compatible state management library inspired by game development architecture.

**Drop-in replacement for Redux.** Works with `react-redux` and Redux DevTools. Adds entity-based state management (ECS) for simpler, more predictable code.

---

## Why Inglorious Store?

Redux is powerful but verbose. You need action creators, reducers, middleware for async operations, and a bunch of decisions about where logic should live. Redux Toolkit cuts the boilerplate, but you're still writing a lot of ceremony.

Inglorious Store ditches the ceremony entirely with **entity-based architecture** inspired by game engines. The same ECS patterns that power AAA games power your state management.

**Key benefits:**

- ✅ Drop-in Redux replacement (same API with `react-redux`)
- ✅ Entity-based state (manage multiple instances effortlessly)
- ✅ No action creators, thunks, or slices
- ✅ Predictable, testable, purely functional code
- ✅ Built-in lifecycle events (`add`, `remove`, `morph`)
- ✅ 10x faster immutability than Redux Toolkit (Mutative vs Immer)

---

## Installation

```bash
npm install @inglorious/store react-redux
```

**For React:** Works with standard `react-redux` without any extra packages.

---

## Quick Comparison: Redux vs RTK vs Inglorious Store

### Redux

```javascript
// Action creators
const addTodo = (text) => ({ type: "ADD_TODO", payload: text })

// Reducer
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), text: action.payload }]
    default:
      return state
  }
}

// Store setup
const store = configureStore({
  reducer: { todos: todosReducer },
})
```

### Redux Toolkit

```javascript
const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(otherAction, (state, action) => {
      // Handle action from other slice
    })
  },
})

const store = configureStore({
  reducer: { todos: todosSlice.reducer },
})
```

### Inglorious Store

```javascript
// Define entity types and their behavior
const types = {
  todoList: {
    addTodo(entity, text) {
      entity.todos.push({ id: Date.now(), text })
    },
  },
}

// Define initial entities
const entities = {
  work: { type: "todoList", todos: [] },
  personal: { type: "todoList", todos: [] },
}

// Create store
const store = createStore({ types, entities })
```

**Key differences:**

- ❌ No action creators
- ❌ No switch statements or cases
- ❌ No slice definitions with extraReducers
- ✅ Define what each entity type can do
- ✅ Add multiple instances by adding entities, not code

---

## Core Concepts

### 🎮 Entities and Types

State consists of **entities** (instances) that have a **type** (behavior definition). Think of type as a class and entities as instances:

```javascript
const entities = {
  workTodos: { type: "todoList", todos: [], priority: "high" },
  personalTodos: { type: "todoList", todos: [], priority: "low" },
  settings: { type: "settings", theme: "dark", language: "en" },
}

const types = {
  todoList: {
    addTodo(entity, text) {
      entity.todos.push({ id: Date.now(), text })
    },
    toggle(entity, id) {
      const todo = entity.todos.find((t) => t.id === id)
      if (todo) todo.completed = !todo.completed
    },
  },
  settings: {
    setTheme(entity, theme) {
      entity.theme = theme
    },
  },
}
```

**Why this matters:**

- Same behavior applies to all instances of that type
- No need to write separate code for each instance
- Your mental model matches your code structure

### 🔄 Event Handlers (Not Reducers)

Unlike Redux reducers, Inglorious Store uses **event handlers** that mutate directly. Immutability is guaranteed under the hood by Mutative (10x faster than Immer):

```javascript
const types = {
  counter: {
    increment(counter) {
      counter.value++ // Looks like mutation, immutable in reality
    },
  },
}
```

---

## Installation & Setup

### Basic Setup (React)

```javascript
import { createStore } from "@inglorious/store"
import { Provider, useSelector, useDispatch } from "react-redux"

// 1. Define entity types
const types = {
  counter: {
    increment(counter) {
      counter.value++
    },
    decrement(counter) {
      counter.value--
    },
  },
}

// 2. Define initial entities
const entities = {
  counter1: { type: "counter", value: 0 },
}

// 3. Create store
const store = createStore({ types, entities })

// 4. Use with react-redux
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

function Counter() {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter1.value)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  )
}
```

### With @inglorious/react-store (Recommended)

```javascript
import { createReactStore } from "@inglorious/react-store"

export const { Provider, useSelector, useNotify } = createReactStore(store)

function App() {
  return (
    <Provider>
      <Counter />
    </Provider>
  ) // No store prop needed
}

function Counter() {
  const notify = useNotify()
  const count = useSelector((state) => state.counter1.value)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => notify("increment")}>+</button> // cleaner API
      <button onClick={() => notify("decrement")}>-</button>
    </div>
  )
}
```

---

## Core Features

### 🎮 Entity-Based State

The real power: add entities dynamically without code changes.

**Redux/RTK:** To manage three todo lists, you can reuse a reducer, but you're still managing multiple slices manually:

```javascript
// Redux - manual management
const store = configureStore({
  reducer: {
    workTodos: todosReducer,
    personalTodos: todosReducer,
    shoppingTodos: todosReducer,
  },
})
```

**Inglorious Store:** Same behavior, no duplication:

```javascript
const types = {
  todoList: {
    addTodo(entity, text) {
      entity.todos.push({ id: Date.now(), text })
    },
  },
}

const entities = {
  work: { type: "todoList", todos: [] },
  personal: { type: "todoList", todos: [] },
  shopping: { type: "todoList", todos: [] },
}
```

**The kicker:** Add a new list at runtime:

```javascript
// Redux/RTK - would need to restructure the store
// Inglorious Store - just notify the built-in 'add' event
store.notify("add", { id: "archive", type: "todoList", todos: [] })

// This triggers the 'create' lifecycle event for the new entity
```

**Lifecycle events:**

Inglorious Store provides three built-in lifecycle events that are broadcast like any other event:

- **`create`** - triggered when a new entity is added via the `add` event
- **`destroy`** - triggered when an entity is removed via the `remove` event
- **`morph`** - change an entity's type on the fly (like Redux's `replaceReducer` for individual entities)

Remember: events are broadcast to all entities. Each handler decides if it should respond:

```javascript
const types = {
  todoList: {
    // Every todoList receives the 'create' event, but only the new one should act on it
    create(entity, id) {
      if (entity.id !== id) return
      entity.createdAt = Date.now()
    },

    destroy(entity, id) {
      if (entity.id !== id) return
      console.log(`Archived list: ${entity.id}`)
    },

    addTodo(entity, text) {
      entity.todos.push({ id: Date.now(), text })
    },
  },
}
```

### 🔊 Event Broadcasting

Events are broadcast to all entities via pub/sub. Every entity handler receives every event of that type. Each handler decides whether to respond based on the payload:

```javascript
const types = {
  todoList: {
    toggle(entity, id) {
      // This runs for EVERY todoList entity, but only acts if it's the right one
      if (entity.id !== id) return
      const todo = entity.todos.find((t) => t.id === id)
      if (todo) todo.completed = !todo.completed
    },
  },
}

// Broadcast to all todo lists
store.notify("toggle", "todo1")
// Each list's toggle handler runs; only the one with todo1 actually updates
```

**Multiple types responding to the same event:**

```javascript
const types = {
  todoList: {
    taskCompleted(entity, taskId) {
      const task = entity.tasks.find((t) => t.id === taskId)
      if (task) task.completed = true
    },
  },
  stats: {
    taskCompleted(entity, taskId) {
      entity.completedCount++
    },
  },
  notifications: {
    taskCompleted(entity, taskId) {
      entity.messages.push("Nice! Task completed.")
    },
  },
}

// One notify call, all three entity types respond
store.notify("taskCompleted", "task123")
```

In Redux, you handle this by making multiple reducers listen to the same action—it works by design, but you wire it up manually in each reducer. In RTK, you use `extraReducers` with `builder.addCase()`. In Inglorious Store, it's automatic: if a type has a handler for the event, it receives and processes it.

### ⚡ Async Operations

This is where the choice of "where does my logic live?" matters.

**Redux/RTK:** Should async logic live in a thunk (where it can access other slices) or in a reducer (where it's pure)? This is a design question you have to answer. Redux thunks are outside the reducer, so they're not deterministic. RTK's `createAsyncThunk` generates pending/fulfilled/rejected actions, spreading your logic across multiple places.

**Inglorious Store:** Your event handlers can be async, and you get deterministic behavior automatically. Inside an async handler, you can access other parts of state (read-only), and you can trigger other events via `api.notify()`. Everything still maintains predictability because of the underlying event queue:

```javascript
const types = {
  todoList: {
    async loadTodos(entity, payload, api) {
      entity.loading = true
      try {
        const todos = await fetch("/api/todos").then((r) => r.json())
        // Trigger another event—it goes in the queue and runs after this handler
        api.notify("todosLoaded", todos)
      } catch (error) {
        api.notify("loadFailed", error.message)
      }
    },

    todosLoaded(entity, todos) {
      entity.todos = todos
      entity.loading = false
    },

    loadFailed(entity, error) {
      entity.error = error
      entity.loading = false
    },
  },
}
```

Notice: you don't need pending/fulfilled/rejected actions. You control the flow directly. The `api` object passed to handlers provides:

- **`api.getEntities()`** - read entire state
- **`api.getEntity(id)`** - read one entity
- **`api.notify(type, payload)`** - trigger other events (queued, not immediate)
- **`api.getTypes()`** - access type definitions (mainly for middleware/plugins)

All events triggered via `api.notify()` enter the queue and process together, maintaining predictability and testability.

### 🌍 Systems for Global Logic

When you need to coordinate updates across multiple entities (not just respond to individual events), use systems. A system runs once per event and has write access to the entire state:

```javascript
const systems = [
  {
    taskCompleted(state, taskId) {
      // Read from multiple todo lists
      const allTodos = Object.values(state)
        .filter((e) => e.type === "todoList")
        .flatMap((e) => e.todos)

      // Update global stats
      state.stats.total = allTodos.length
      state.stats.completed = allTodos.filter((t) => t.completed).length
    },
  },
]

const store = createStore({ types, entities, systems })
```

Systems receive the entire state and can modify any entity. They're useful for cross-cutting concerns, maintaining derived state, or coordinating complex state updates that can't be expressed as individual entity handlers.

### 🔗 Behavior Composition

A type can be a single behavior object, or an array of behaviors. A behavior is either an object with event handlers, or a function that takes a behavior and returns an enhanced behavior (decorator pattern):

```javascript
// Base behavior
const handlers = {
  submit(entity, value) {
    entity.value = ""
  },
}

// Function that wraps and enhances a behavior
const validated = (behavior) => ({
  submit(entity, value, api) {
    if (!value.trim()) return
    behavior.submit?.(entity, value, api)
  },
})

// Another wrapper
const withLoading = (behavior) => ({
  submit(entity, value, api) {
    entity.loading = true
    behavior.submit?.(entity, value, api)
    entity.loading = false
  },
})

// Compose them together
const types = {
  form: [handlers, validated, withLoading],
}
```

When multiple behaviors define the same event, they all run in order. This allows you to build middleware-like patterns: validation, logging, error handling, loading states, etc.

### ⏱️ Batched Mode

Process multiple events together before re-rendering:

```javascript
const store = createStore({ types, entities, mode: "batched" })

store.notify("playerMoved", { x: 100, y: 50 })
store.notify("enemyAttacked", { damage: 10 })
store.notify("particleCreated", { type: "explosion" })

requestAnimationFrame(() => store.update())
```

Instead of re-rendering after each event, batch them and re-render once. This is what powers high-performance game engines and smooth animations.

---

## Comparison with Other State Libraries

| Feature                   | Redux        | RTK          | Zustand    | Jotai      | Pinia      | MobX       | Inglorious Store |
| ------------------------- | ------------ | ------------ | ---------- | ---------- | ---------- | ---------- | ---------------- |
| **Boilerplate**           | 🔴 High      | 🟡 Medium    | 🟢 Low     | 🟢 Low     | 🟡 Medium  | 🟢 Low     | 🟢 Low           |
| **Multiple instances**    | 🔴 Manual    | 🔴 Manual    | 🔴 Manual  | 🔴 Manual  | 🟡 Medium  | 🟡 Medium  | 🟢 Built-in      |
| **Lifecycle events**      | 🔴 No        | 🔴 No        | 🔴 No      | 🔴 No      | 🔴 No      | 🔴 No      | 🟢 Yes           |
| **Async logic placement** | 🟡 Thunks    | 🟡 Complex   | 🟢 Free    | 🟢 Free    | 🟢 Free    | 🟢 Free    | 🟢 In handlers   |
| **Redux DevTools**        | 🟢 Yes       | 🟢 Yes       | 🟡 Partial | 🟡 Partial | 🟡 Partial | 🟢 Yes     | 🟢 Yes           |
| **Time-travel debugging** | 🟢 Yes       | 🟢 Yes       | 🔴 No      | 🔴 No      | 🔴 No      | 🟡 Limited | 🟢 Yes           |
| **Testability**           | 🟢 Excellent | 🟢 Excellent | 🟡 Good    | 🟡 Good    | 🟡 Good    | 🟡 Medium  | 🟢 Excellent     |
| **Immutability**          | 🔴 Manual    | 🟢 Immer     | 🔴 Manual  | 🔴 Manual  | 🔴 Manual  | 🔴 Manual  | 🟢 Mutative      |

---

## API Reference

### `createStore(options)`

```javascript
const store = createStore({
  types, // Object: entity type definitions
  entities, // Object: initial entities
  systems, // Array (optional): global state handlers
  mode, // String (optional): 'eager' (default) or 'batched'
})
```

**Returns:** Redux-compatible store

### Types Definition

```javascript
const types = {
  entityType: [
    // Behavior objects
    {
      eventName(entity, payload, api) {
        entity.value = payload
        api.notify("otherEvent", data)
      },
    },
    // Behavior functions (decorators)
    (behavior) => ({
      eventName(entity, payload, api) {
        // Wrap the behavior
        behavior.eventName?.(entity, payload, api)
      },
    }),
  ],
}
```

### Event Handler API

Each handler receives three arguments:

- **`entity`** - the entity instance (mutate freely, immutability guaranteed)
- **`payload`** - data passed with the event
- **`api`** - access to store methods:
  - `getEntities()` - entire state (read-only)
  - `getEntity(id)` - single entity (read-only)
  - `notify(type, payload)` - trigger other events (queued)
  - `getTypes()` - type definitions (for middleware)

### Built-in Lifecycle Events

- **`create(entity, id)`** - triggered when entity added via `add` event
- **`destroy(entity, id)`** - triggered when entity removed via `remove` event
- **`morph(entity, newType)`** - triggered when entity type changes

### Notify vs Dispatch

Both work (dispatch for Redux compatibility), but `notify` is cleaner:

```javascript
store.notify("eventName", payload)
store.dispatch({ type: "eventName", payload }) // Redux-compatible alternative
```

---

## Use Cases

### Perfect For

- 🎮 Apps with multiple instances of the same entity type
- 🎯 Real-time collaborative features
- ⚡ Complex state coordination and async operations
- 📊 High-frequency updates (animations, games)
- 🔄 Undo/redo, time-travel debugging

### Still Great For

- Any Redux use case (true drop-in replacement)
- Migration path from Redux (keep using react-redux)

---

## Part of the Inglorious Engine

This store powers the [Inglorious Engine](https://github.com/IngloriousCoderz/inglorious-engine), a functional game engine. The same patterns that power games power your web apps.

---

## License

MIT © [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

Free to use, modify, and distribute.

---

## Contributing

Contributions welcome! Please read our [Contributing Guidelines](../../CONTRIBUTING.md) first.
