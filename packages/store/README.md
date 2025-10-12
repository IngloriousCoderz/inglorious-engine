# Inglorious Store

[![NPM version](https://img.shields.io/npm/v/@inglorious/store.svg)](https://www.npmjs.com/package/@inglorious/store)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Build apps that are already multiplayer-ready.**

Inglorious Store uses battle-tested patterns from game development to give you an architecture that scales from simple solo apps to real-time collaboration—without refactoring. Start with a basic todo list today. Add collaborative features next year. Same code, zero rewrites.

Why settle for state management that wasn't designed for real-time sync? Games solved distributed state synchronization decades ago. Now you can use the same proven patterns for your apps.

---

## Why Video Game Patterns?

Games solved the hardest real-time problems: syncing state across laggy networks with hundreds of players at 60fps. They use:

- **Deterministic event processing** - same events + same handlers = guaranteed identical state
- **Event queues** - natural ordering and conflict resolution
- **Serializable state** - trivial to send over the network
- **Client-side prediction** - responsive UIs that stay in sync

These patterns aren't just for games. They're perfect for any app that might need:

- Real-time collaboration (like Notion, Figma)
- Live updates (dashboards, chat)
- Undo/redo and time-travel debugging
- Multiplayer features

**The best part?** You get this architecture from day one, even for simple apps. When you need these features later, they're already built-in.

---

## Installation

```bash
npm install @inglorious/store
```

**For React apps**, also install the React bindings:

```bash
npm install @inglorious/react-store
```

See [@inglorious/react-store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/react-store) for React-specific documentation.

---

## Update Modes

Inglorious Store supports two update modes:

### Eager Mode (default) - Like Redux

```javascript
const store = createStore({ types, entities }) // mode: "eager" is default
store.notify("addTodo", { text: "Buy milk" })
// State updates immediately, no need to call update()
```

**Best for:** Simple apps with synchronous logic.

**Limitation:** If an event handler needs to dispatch another event, only the first event processes. Use batched mode for event chains.

### Batched Mode - Like game engines

```javascript
const store = createStore({ types, entities, mode: "batched" })
store.notify("addTodo", { text: "Buy milk" })
store.notify("toggleTodo", "todo1")
store.update() // Process all queued events at once
```

**Best for:**

- Apps with async operations (API calls, data fetching)
- Event handlers that dispatch other events
- Games, animations, or high-frequency updates
- Explicit control over when state updates

**Why batched mode for async?**

When fetching data from an API, you typically need two events: one to initiate the fetch, and another to store the result. Batched mode allows this pattern:

```javascript
const types = {
  todoList: {
    async fetchTodos(entity, payload, api) {
      const response = await fetch("/api/todos")
      const todos = await response.json()

      // This event will be processed in the same update cycle
      api.notify("todosReceived", todos)
    },

    todosReceived(entity, todos) {
      entity.todos = todos
      entity.loading = false
    },
  },
}

// In your app
store.notify("fetchTodos")
await store.update() // Both fetchTodos AND todosReceived process together
```

In eager mode, only `fetchTodos` would process, and `todosReceived` would be ignored.

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
store.notify("toggle", "todo1")
store.notify("toggle", "todo2")
```

> **Important:** `toggle` is not a method—it's an **event handler**. When you notify an event, it's broadcast to **all entities** that have that handler (pub/sub pattern). Use the payload to filter which entities should respond.

### 🔄 **Event Queue with Batching**

Events are queued and processed together in batched mode, preventing cascading updates and enabling predictable state changes.

```javascript
const store = createStore({ types, entities, mode: "batched" })

// Dispatch multiple events
store.notify("increment", "counter1")
store.notify("increment", "counter2")
store.notify("increment", "counter3")

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
// Start building solo
store.notify("addTodo", { text: "Buy milk" })

// Add multiplayer later in ~10 lines
socket.on("remote-event", (event) => {
  store.notify(event.type, event.payload)
  // States stay perfectly in sync across all clients
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
  counter1: { type: "counter", value: 0 },
  counter2: { type: "counter", value: 10 },
}

const store = createStore({ types, entities })

// One event updates ALL counters
store.notify("increment")
store.update()

console.log(store.getState().counter1.value) // => 1
console.log(store.getState().counter2.value) // => 11

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
const selectTasks = (state) => state.list.tasks
const selectActiveFilter = (state) => state.footer.activeFilter

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
store.notify("formSubmit", store.getState().form.value)
store.notify("toggleClick", 1) // Only task with id=1 will respond
store.notify("filterClick", "active")

// 7. Process event queue (in eager mode this happens automatically)
store.update()
```

---

## Core Concepts

### Pub/Sub Event Architecture

**This is not OOP with methods—it's a pub/sub (publish/subscribe) event system.**

When you call `store.notify('toggle', 'todo1')`, the `toggle` event is broadcast to **all entities**. Any entity that has a `toggle` handler will process the event and decide whether to respond based on the payload.

```javascript
const todoType = {
  // This handler runs for EVERY todo when 'toggle' is notified
  toggle(todo, id) {
    if (todo.id !== id) return // Filter: only this todo responds
    todo.completed = !todo.completed
  },
}

// This broadcasts 'toggle' to all entities
store.notify("toggle", "todo1") // Only todo1 actually updates
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
  item1: { type: "cartItem", name: "Shoes", quantity: 1, price: 99 },
  item2: { type: "cartItem", name: "Shirt", quantity: 2, price: 29 },
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
store.notify("increment", "counter1")

// With additional data
store.notify("applyDiscount", { id: "item1", percent: 10 })

// Also supports dispatch() for Redux compatibility
store.dispatch({ type: "increment", payload: "counter1" })

// Process the queue - this is when handlers actually run
// (In eager mode, this happens automatically)
store.update()
```

**Key insight:** Events go into a queue and are processed together during `update()`. This enables batching and prevents cascading updates within a single frame.

### Systems (Optional)

Systems are global event handlers that can coordinate updates across **multiple entities at once**. Unlike entity handlers (which run once per entity), a system runs **once per event** and has write-access to the entire state.

**When you need a system:**

- Multiple entities need to update based on relationships between them
- Updates require looking at all entities together (not individually)
- Logic that can't be expressed as independent entity handlers

**Example: Inventory Weight Limits**

When adding an item to inventory, you need to check if the **total weight** of all items exceeds the limit. This can't be done in individual item handlers because each item only knows about itself.

```javascript
const types = {
  item: {
    addToInventory(item, newItemData) {
      // Individual items don't know about other items
      // Can't check total weight here!
    },
  },
}

const systems = [
  {
    addToInventory(state, newItemData) {
      // Calculate total weight across ALL items
      const items = Object.values(state).filter((e) => e.type === "item")
      const currentWeight = items.reduce((sum, item) => sum + item.weight, 0)
      const maxWeight = state.player.maxCarryWeight

      // Check if adding this item would exceed the limit
      if (currentWeight + newItemData.weight > maxWeight) {
        // Reject the add - drop the heaviest item instead
        const heaviestItem = items.reduce((max, item) =>
          item.weight > max.weight ? item : max,
        )
        delete state[heaviestItem.id]
        state.ui.message = `Dropped ${heaviestItem.name} (too heavy!)`
      }

      // Add the new item
      const newId = `item${Date.now()}`
      state[newId] = {
        id: newId,
        type: "item",
        ...newItemData,
      }
    },
  },
]
```

**Why this needs a system:**

- Requires reading **all items** to calculate total weight
- Must make a **coordinated decision** (which item to drop)
- Updates **multiple entities** based on aggregate state (delete one, add another)
- Can't be split into independent entity handlers

**Another example: Multiplayer Turn System**

```javascript
const systems = [
  {
    endTurn(state, playerId) {
      // Find current player
      const players = Object.values(state).filter((e) => e.type === "player")
      const currentPlayer = players.find((p) => p.id === playerId)

      // Mark current player's turn as ended
      currentPlayer.isTurn = false
      currentPlayer.actionsRemaining = 0

      // Find next player
      const nextPlayerIndex =
        (players.indexOf(currentPlayer) + 1) % players.length
      const nextPlayer = players[nextPlayerIndex]

      // Give turn to next player
      nextPlayer.isTurn = true
      nextPlayer.actionsRemaining = 3

      // Update round counter if we've cycled through all players
      if (nextPlayerIndex === 0) {
        state.gameState.round++
      }
    },
  },
]
```

**This requires a system because:**

- Must coordinate between multiple player entities
- Needs to maintain turn order across all players
- Updates multiple entities in a specific sequence
- Logic can't be split per-player

**For most apps, you won't need systems.** Use selectors for derived data and entity handlers for individual entity logic.

---

## API Reference

### `createStore(options)`

Creates a new store instance.

**Options:**

- `types` (object): Map of type names to behaviors (single object or array)
- `entities` (object): Initial entities by ID
- `systems` (array, optional): Global event handlers
- `middlewares` (array, optional): Middleware functions that enhance store behavior
- `mode` (`"eager"|"batched"`, optional): Whether `store.update()` is invoked automatically at every `store.notify()` or manually. Defaults to `"eager"`, which makes the store behave like Redux

**Returns:**

- `subscribe(listener)`: Subscribe to state changes
- `update(dt)`: Process event queue (optional `dt` for time-based logic)
- `notify(type, payload)`: Queue an event
- `dispatch(event)`: Redux-compatible event dispatch
- `getTypes()`: Returns the augmented types configuration
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
const selectCompletedTasks = createSelector(
  [(state) => state.list.tasks],
  (tasks) => tasks.filter((task) => task.completed),
)
```

---

## Use Cases

### ✅ Perfect For

- **Apps with async operations** (API calls, data fetching - use batched mode)
- **Apps that might need collaboration someday** (start simple, scale without refactoring)
- **Real-time collaboration** (like Figma, Notion, Google Docs)
- **Chat and messaging apps**
- **Live dashboards and monitoring**
- **Interactive data visualizations**
- **Apps with undo/redo**
- **Collection-based UIs** (lists, feeds, boards)
- **...and games!**

### 🤔 Maybe Overkill For

- Simple forms with local state only
- Static marketing pages
- Apps that will **definitely never** need real-time features

**But here's the thing:** Most successful apps eventually need collaboration, undo/redo, or live updates. With Inglorious Store, you're ready when that happens.

---

## Comparison

| Feature                     | Inglorious Store  | Redux            | Redux Toolkit    | Zustand       | Jotai         | Pinia           | MobX            |
| --------------------------- | ----------------- | ---------------- | ---------------- | ------------- | ------------- | --------------- | --------------- |
| **Integrated Immutability** | ✅ Mutative       | ❌ Manual        | ✅ Immer         | ❌ Manual     | ✅ Optional   | ✅ Built-in     | ✅ Observables  |
| **Event Queue/Batching**    | ✅ Built-in       | ❌               | ❌               | ❌            | ❌            | ❌              | ✅ Automatic    |
| **Dispatch from Handlers**  | ✅ Safe (queued)  | ❌ Not allowed   | ❌ Not allowed   | ✅            | ✅            | ✅              | ✅              |
| **Redux DevTools**          | ⚠️ Limited        | ✅ Native        | ✅ Native        | ✅ Middleware | ⚠️ Limited    | ✅ Vue DevTools | ⚠️ Limited      |
| **react-redux Compatible**  | ✅ Yes            | ✅ Yes           | ✅ Yes           | ❌            | ❌            | ❌ Vue only     | ❌              |
| **Time-Travel Debug**       | ✅ Built-in       | ✅ Via DevTools  | ✅ Via DevTools  | ⚠️ Manual     | ❌            | ⚠️ Limited      | ❌              |
| **Entity-Based State**      | ✅ First-class    | ⚠️ Manual        | ✅ EntityAdapter | ❌            | ❌            | ❌              | ❌              |
| **Pub/Sub Events**          | ✅ Core pattern   | ❌               | ❌               | ❌            | ❌            | ❌              | ❌              |
| **Multiplayer-Ready**       | ✅ Deterministic  | ⚠️ With work     | ⚠️ With work     | ⚠️ With work  | ❌            | ❌              | ❌              |
| **Testability**             | ✅ Pure functions | ✅ Pure reducers | ✅ Pure reducers | ⚠️ With mocks | ⚠️ With mocks | ⚠️ With mocks   | ❌ Side effects |
| **Learning Curve**          | Medium            | High             | Medium           | Low           | Medium        | Low             | Medium          |
| **Bundle Size**             | Small             | Small            | Medium           | Tiny          | Small         | Medium          | Medium          |

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

Adding multiplayer to an existing app is usually a massive refactor. With Inglorious Store, it's an afternoon project.

### Step 1: Your app already works locally

```javascript
store.notify("movePlayer", { x: 10, y: 20 })
store.update()
```

### Step 2: Add WebSocket (literally ~10 lines)

```javascript
// Receive events from other clients
socket.on("remote-event", (event) => {
  store.notify(event.type, event.payload)
})

// Send your events to other clients
const processedEvents = store.update()
processedEvents.forEach((event) => {
  socket.emit("event", event)
})
```

**That's it.** Because your event handlers are pure functions and the state is deterministic, all clients stay perfectly in sync.

### Why This Works

1. **Deterministic:** Same events + same state = same result (always)
2. **Serializable:** Events are plain objects (easy to send over network)
3. **Ordered:** Event queue ensures predictable processing
4. **Conflict-free:** Last write wins, or implement custom merge logic

### Example: Collaborative Todo List

```javascript
// Client A adds a todo
store.notify("addTodo", { id: "todo1", text: "Buy milk" })

// Event gets broadcast to all clients
// All clients process the same event
// All clients end up with identical state

// Even works offline! Events queue up, sync when reconnected
```

This is exactly how multiplayer games work. Now your app can too.

---

## Advanced: Time-Based Updates

For animations, games, or any time-dependent logic, you can run a continuous update loop:

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

// Run at 30 FPS (good for most UIs)
setInterval(() => store.update(), 1000 / 30)

// Or 60 FPS (for smooth animations/games)
function loop() {
  store.update()
  requestAnimationFrame(loop)
}
loop()
```

**For typical apps (todos, forms, dashboards):** Use eager mode (default). No loop needed.

**For real-time apps (games, animations, live data):** Use batched mode with a loop for smooth, consistent updates.

---

## The Path from Solo to Multiplayer

### Week 1: Build a simple todo app

```javascript
store.notify("addTodo", { text: "Buy milk" })
```

_Works great. Clean architecture. Nothing fancy._

### Month 6: Users love it, ask for undo/redo

```javascript
const snapshot = store.getState()
// ... user makes changes ...
store.setState(snapshot) // Undo!
```

_Already built-in. No refactoring needed._

### Year 1: Competitor launches with real-time collaboration

```javascript
socket.on("remote-event", (e) => store.notify(e.type, e.payload))
```

_Add multiplayer in an afternoon. You win._

---

## Part of the Inglorious Engine

This store powers the [Inglorious Engine](https://github.com/IngloriousCoderz/inglorious-engine), a functional game engine. But you don't need to build games to benefit from game development patterns!

---

## What's Next?

- 📖 **[@inglorious/react-store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/react-store)** - React integration with hooks
- 🎮 **[@inglorious/engine](https://github.com/IngloriousCoderz/inglorious-engine)** - Full game engine built on this store
- 🌐 **[@inglorious/server](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/server)** - Server-side multiplayer support
- 💬 **[GitHub Discussions](https://github.com/IngloriousCoderz/inglorious-engine/discussions)** - Get help and share what you're building

---

## License

**MIT License - Free and open source**

Created by [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

You're free to use, modify, and distribute this software. See [LICENSE](../../LICENSE) for details.

---

## Contributing

Contributions welcome! Please read our [Contributing Guidelines](../../CONTRIBUTING.md) first.
