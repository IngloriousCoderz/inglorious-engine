# Inglorious Store

[![NPM version](https://img.shields.io/npm/v/@inglorious/store.svg)](https://www.npmjs.com/package/@inglorious/store)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**State management inspired by video games.**

Inglorious Store brings battle-tested patterns from game development to modern web applications. If your app needs real-time updates, multiplayer features, or complex interactive state, you'll benefit from the same techniques that power multiplayer games and collaborative tools like Figma.

Perfect for: real-time collaboration, live dashboards, chat apps, interactive visualizations, and any application where state synchronization matters.

---

## Why Video Game Patterns?

Video games solved distributed state synchronization decades ago. They handle:

- **60fps updates** with thousands of entities
- **Multiplayer** with lag compensation and state sync
- **Deterministic simulation** for replays and debugging
- **Complex interactions** between many objects

If it works for games, it'll handle your app's state with ease.

---

## Key Features

### 🎮 **Entity-Based State**

Define behavior once, reuse it across all instances of the same type. Perfect for managing collections (todos, messages, cart items).

```javascript
// Define behavior for ALL todos
const todoType = {
  toggle(todo, id) {
    if (todo.id !== id) return
    todo.completed = !todo.completed
  },
}

// Toggle specific todos
store.notify("toggle", "todo-1")
store.notify("toggle", "todo-2")
```

> **Important:** `toggle` is not a method—it's an **event handler**. When you notify an event, it's broadcast to **all entities** that have that handler (pub/sub pattern). Use the payload to filter which entities should respond.

### 🔄 **Event Queue with Batching**

Events are queued and processed together, preventing cascading updates and enabling predictable state changes.

```javascript
// Dispatch multiple events
store.notify("increment", "counter-1")
store.notify("increment", "counter-2")
store.notify("increment", "counter-3")

// Process all at once (single React re-render)
store.update()
```

### ⏱️ **Time-Travel Debugging**

Save and replay state at any point—built-in, not an afterthought.

```javascript
const snapshot = store.getState()
// ... user makes changes ...
store.setState(snapshot) // Instant undo
```

### 🌐 **Multiplayer-Ready**

Synchronize state across clients by sending serializable events. Same events + same handlers = guaranteed sync.

```javascript
socket.on("userAction", (event) => {
  store.notify(event.type, event.payload)
  // All clients stay in perfect sync
})
```

### ✍️ **Ergonomic Immutability**

Write code that looks mutable, get immutable updates automatically via [Mutative](https://mutative.js.org/).

```javascript
// Looks like mutation, but creates new immutable state
const todoType = {
  rename(todo, text) {
    todo.text = text // So clean!
  },
}
```

### 🔗 **Redux-Compatible**

Works with `react-redux` and Redux DevTools. Provides both `notify()` and `dispatch()` for compatibility.

---

## Installation

```bash
npm install @inglorious/store
```

---

## Quick Start

### Simple Counter Example

```javascript
import { createStore } from "@inglorious/store"

// Types can be a single behavior (not an array) for simplicity
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

const entities = {
  "counter-1": { type: "counter", value: 0 },
  "counter-2": { type: "counter", value: 10 },
}

const store = createStore({ types, entities })

// One event updates ALL counters
store.notify("increment")
store.update()

console.log(store.getState().entities["counter-1"].value) // => 1
console.log(store.getState().entities["counter-2"].value) // => 11

// To update just one counter, add filtering logic in the handler
```

### Complete Todo App Example

```javascript
import { createStore } from "@inglorious/store"
import { createSelector } from "@inglorious/store/select"

// 1. Define types (can be a single behavior or array of behaviors)
const types = {
  form: {
    inputChange(entity, value) {
      entity.value = value
    },
    formSubmit(entity) {
      entity.value = ""
    },
  },

  list: {
    formSubmit(entity, value) {
      entity.tasks.push({
        id: entity.tasks.length + 1,
        text: value,
        completed: false,
      })
    },
    toggleClick(entity, id) {
      const task = entity.tasks.find((task) => task.id === id)
      task.completed = !task.completed
    },
    deleteClick(entity, id) {
      const index = entity.tasks.findIndex((task) => task.id === id)
      entity.tasks.splice(index, 1)
    },
    clearClick(entity) {
      entity.tasks = entity.tasks.filter((task) => !task.completed)
    },
  },

  footer: {
    filterClick(entity, filter) {
      entity.activeFilter = filter
    },
  },
}

// 2. Define initial entities
const entities = {
  form: {
    type: "form",
    value: "",
  },
  list: {
    type: "list",
    tasks: [],
  },
  footer: {
    type: "footer",
    activeFilter: "all",
  },
}

// 3. Create store
const store = createStore({ types, entities })

// 4. Create selectors
const selectTasks = ({ entities }) => entities.list.tasks
const selectActiveFilter = ({ entities }) => entities.footer.activeFilter

const selectFilteredTasks = createSelector(
  [selectTasks, selectActiveFilter],
  (tasks, activeFilter) => {
    switch (activeFilter) {
      case "active":
        return tasks.filter((t) => !t.completed)
      case "completed":
        return tasks.filter((t) => t.completed)
      default:
        return tasks
    }
  },
)

// 5. Subscribe to changes
store.subscribe(() => {
  console.log("Filtered tasks:", selectFilteredTasks(store.getState()))
})

// 6. Dispatch events (use notify or dispatch - both work!)
store.notify("inputChange", "Buy milk")
store.notify("formSubmit", store.getState().entities.form.value)
store.notify("toggleClick", 1) // Only todo with id=1 will respond
store.notify("filterClick", "active")

// 7. Process event queue
store.update()
```

---

## Core Concepts

### Pub/Sub Event Architecture

**This is not OOP with methods—it's a pub/sub (publish/subscribe) event system.**

When you call `store.notify('toggle', 'todo-1')`, the `toggle` event is broadcast to **all entities**. Any entity that has a `toggle` handler will process the event and decide whether to respond based on the payload.

```javascript
const todoType = {
  // This handler runs for EVERY todo when 'toggle' is notified
  toggle(todo, id) {
    if (todo.id !== id) return // Filter: only this todo responds
    todo.completed = !todo.completed
  },
}

// This broadcasts 'toggle' to all entities
store.notify("toggle", "todo-1") // Only todo-1 actually updates
```

**Why this matters:**

- ✅ Multiple entities of different types can respond to the same event
- ✅ Enables reactive, decoupled behavior
- ✅ Perfect for coordinating related entities
- ✅ Natural fit for multiplayer/real-time sync

**Example of multiple entities responding:**

```javascript
const types = {
  player: {
    gameOver(player) {
      player.active = false
    },
  },
  enemy: {
    gameOver(enemy) {
      enemy.active = false
    },
  },
  ui: {
    gameOver(ui) {
      ui.showGameOverScreen = true
    },
  },
}

// One event, all three entity types respond (if they have the handler)
store.notify("gameOver")
```

### Entities and Types

Your state is a collection of **entities** (instances) organized by **type** (like classes or models).

```javascript
const entities = {
  "item-1": { type: "cartItem", name: "Shoes", quantity: 1, price: 99 },
  "item-2": { type: "cartItem", name: "Shirt", quantity: 2, price: 29 },
}
```

### Behaviors

Define how entities respond to events. Behaviors can be a single object or an array of composable objects.

```javascript
// Single behavior (simple)
const counterType = {
  increment(counter) {
    counter.value++
  },
  decrement(counter) {
    counter.value--
  },
}

// Array of behaviors (composable)
const cartItemType = [
  {
    incrementQuantity(item) {
      item.quantity++
    },
    decrementQuantity(item) {
      if (item.quantity > 1) item.quantity--
    },
  },
  {
    applyDiscount(item, percent) {
      item.price = item.price * (1 - percent / 100)
    },
  },
]
```

### Events

Events are broadcast to all relevant handlers in a pub/sub pattern.

```javascript
// Simplest form - just the entity ID
store.notify("increment", "counter-1")

// With additional data
store.notify("applyDiscount", { id: "item-1", percent: 10 })

// Also supports dispatch() for Redux compatibility
store.dispatch({ type: "increment", payload: "counter-1" })

// Process the queue - this is when handlers actually run
store.update()
```

**Key insight:** Events go into a queue and are processed together during `update()`. This enables batching and prevents cascading updates within a single frame.

### Systems (Optional)

For global state logic that doesn't belong to a specific entity type.

```javascript
const systems = [
  {
    calculateTotal(state) {
      state.cartTotal = Object.values(state.entities)
        .filter((e) => e.type === "cartItem")
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
  },
]
```

---

## API Reference

### `createStore(options)`

Creates a new store instance.

**Options:**

- `types` (object): Map of type names to behaviors (single object or array)
- `entities` (object): Initial entities by ID
- `systems` (array, optional): Global event handlers

**Returns:**

- `subscribe(listener)`: Subscribe to state changes
- `update(dt)`: Process event queue (optional `dt` for time-based logic)
- `notify(type, payload)`: Queue an event
- `dispatch(event)`: Redux-compatible event dispatch
- `getState()`: Get current immutable state
- `setState(newState)`: Replace entire state
- `reset()`: Reset to initial state

### `createApi(store)`

Creates a convenience wrapper with utility methods.

**Returns:**

- `createSelector(inputSelectors, resultFunc)`: Memoized selectors
- `getTypes()`, `getEntities()`, `getEntity(id)`: State accessors
- `notify(type, payload)`: Dispatch events

### `createSelector(inputSelectors, resultFunc)`

Create memoized, performant selectors.

```javascript
const selectCompletedTodos = createSelector(
  [(state) => state.entities],
  (entities) => Object.values(entities).filter((e) => e.completed),
)
```

---

## Use Cases

### ✅ Perfect For

- **Real-time collaboration** (like Figma, Google Docs)
- **Chat and messaging apps**
- **Live dashboards and monitoring**
- **Interactive data visualizations**
- **Apps with undo/redo**
- **Multiplayer features**
- **Collection-based UIs** (lists, feeds, boards)
- **...and games!**

### 🤔 Maybe Overkill For

- Simple forms with local state
- Static marketing pages
- Basic CRUD with no real-time needs

---

## Comparison

| Feature                     | Inglorious Store  | Redux               | Redux Toolkit    | Zustand       | Jotai         | Pinia           | MobX            |
| --------------------------- | ----------------- | ------------------- | ---------------- | ------------- | ------------- | --------------- | --------------- |
| **Integrated Immutability** | ✅ Mutative       | ❌ Manual           | ✅ Immer         | ❌ Manual     | ✅ Optional   | ✅ Built-in     | ✅ Observables  |
| **Event Queue/Batching**    | ✅ Built-in       | ❌                  | ❌               | ❌            | ❌            | ❌              | ✅ Automatic    |
| **Dispatch from Handlers**  | ✅ Safe (queued)  | ❌ Not allowed      | ❌ Not allowed   | ✅            | ✅            | ✅              | ✅              |
| **Redux DevTools**          | ⚠️ Limited        | ✅ Native           | ✅ Native        | ✅ Middleware | ⚠️ Limited    | ✅ Vue DevTools | ⚠️ Limited      |
| **react-redux Compatible**  | ✅ Yes            | ✅ Yes              | ✅ Yes           | ❌            | ❌            | ❌ Vue only     | ❌              |
| **Time-Travel Debug**       | ✅ Built-in       | ✅ Via DevTools     | ✅ Via DevTools  | ⚠️ Manual     | ❌            | ⚠️ Limited      | ❌              |
| **Entity-Based State**      | ✅ First-class    | ⚠️ Manual normalize | ✅ EntityAdapter | ❌            | ❌            | ❌              | ❌              |
| **Pub/Sub Events**          | ✅ Core pattern   | ❌                  | ❌               | ❌            | ❌            | ❌              | ❌              |
| **Multiplayer-Ready**       | ✅ Deterministic  | ⚠️ With work        | ⚠️ With work     | ⚠️ With work  | ❌            | ❌              | ❌              |
| **Testability**             | ✅ Pure functions | ✅ Pure reducers    | ✅ Pure reducers | ⚠️ With mocks | ⚠️ With mocks | ⚠️ With mocks   | ❌ Side effects |
| **Learning Curve**          | Medium            | High                | Medium           | Low           | Medium        | Low             | Medium          |
| **Bundle Size**             | Small             | Small               | Medium           | Tiny          | Small         | Medium          | Medium          |

### Key Differences

**vs Redux/RTK:**

- Integrated immutability (no manual spreads)
- Event queue with automatic batching
- Can dispatch from handlers safely
- Entity-based architecture built-in
- Reusable handlers across instances

**vs Zustand:**

- Deterministic event processing (better for multiplayer)
- Built-in time-travel debugging
- Entity/type architecture for collections
- Event queue prevents cascading updates
- Redux DevTools compatible

**vs Jotai:**

- Different paradigm (events vs atoms)
- Better for entity collections
- Built-in normalization
- Explicit event flow

**vs Pinia:**

- React-compatible (Pinia is Vue-only)
- Event queue system
- Deterministic updates for multiplayer

**vs MobX:**

- Explicit events (less magic)
- Serializable state (easier persistence/sync)
- Deterministic (better for debugging)
- Redux DevTools compatible

---

**When to choose Inglorious Store:**

- Building real-time/collaborative features
- Managing collections of similar items
- Need deterministic state for multiplayer
- Want built-in time-travel debugging
- Coming from Redux and want better DX

**When to choose alternatives:**

- **Zustand/Jotai**: Simple apps, prefer minimal API
- **Redux Toolkit**: Large team, established Redux patterns
- **Pinia**: Vue ecosystem
- **MobX**: Prefer reactive/observable patterns

---

## Advanced: Real-Time Sync

```javascript
// Client-side
socket.on("server-event", (event) => {
  store.notify(event.type, event.payload)
  store.update()
})

// Send local events to server
store.subscribe(() => {
  const state = store.getState()
  socket.emit("state-update", serializeState(state))
})
```

---

## Advanced: Time-Based Updates

For animations or continuous updates (like in games):

```javascript
const types = {
  particle: [
    {
      update(particle, dt) {
        // dt = delta time in milliseconds
        particle.x += particle.velocityX * dt
        particle.y += particle.velocityY * dt
        particle.life -= dt
      },
    },
  ],
}

// In your game/animation loop
function loop(timestamp) {
  const dt = timestamp - lastTime
  store.update(dt)
  requestAnimationFrame(loop)
}
```

---

## Part of the Inglorious Engine

This store powers the [Inglorious Engine](https://github.com/IngloriousCoderz/inglorious-engine), a functional game engine. But you don't need to build games to benefit from game development patterns!

---

## License

MIT

---

## Contributing

Contributions welcome! Please read our [Contributing Guidelines](../../CONTRIBUTING.md) first.
