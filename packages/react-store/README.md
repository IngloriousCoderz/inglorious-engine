# @inglorious/react-store

[![NPM version](https://img.shields.io/npm/v/@inglorious/react-store.svg)](https://www.npmjs.com/package/@inglorious/react-store)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official React bindings for **[@inglorious/store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/store)**.

Connect your React app to Inglorious Store with a familiar API. Built on `react-redux` for rock-solid performance and compatibility.

---

## Features

- **Drop-in Integration**: Works just like `react-redux` with enhanced features for Inglorious Store
- **Custom `useNotify` Hook**: Dispatch events with a clean, ergonomic API
- **Flexible Update Modes**:
  - **Eager mode** - Updates process immediately (responsive UIs)
  - **Batched mode** - Updates process on a timer (performance optimization)
- **Redux DevTools Support**: Full integration with Redux DevTools for debugging
- **Battle-tested**: Built on `react-redux` for proven performance and stability

---

## Installation

```bash
npm install @inglorious/store @inglorious/react-store react react-dom
```

---

## Quick Start

### 1. Create Your Store

```javascript
// store.js
import { createStore } from "@inglorious/store"

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
  myCounter: { type: "counter", value: 0 },
}

export const store = createStore({ types, entities })
```

### 2. Set Up React Bindings

```javascript
// react-store.js
import { createReactStore } from "@inglorious/react-store"
import { store } from "./store"

// Eager mode (default) - updates process immediately
export const { Provider, useSelector, useNotify } = createReactStore(store)

// Or batched mode - updates process at 30 FPS
// export const { Provider, useSelector, useNotify } = createReactStore(store, {
//   mode: "batched",
//   fps: 30
// })
```

### 3. Wrap Your App

```jsx
// App.jsx
import { Provider } from "./react-store"

function App() {
  return (
    <Provider>
      <Counter />
    </Provider>
  )
}
```

### 4. Use in Components

```jsx
// Counter.jsx
import { useNotify, useSelector } from "./react-store"

function Counter() {
  const notify = useNotify()
  const value = useSelector((state) => state.myCounter.value)

  return (
    <div>
      <h1>Count: {value}</h1>
      <button onClick={() => notify("increment")}>+</button>
      <button onClick={() => notify("decrement")}>-</button>
    </div>
  )
}
```

---

## API Reference

### `createReactStore(store, config?)`

Creates React bindings for an Inglorious Store.

**Parameters:**

- `store` (required): An Inglorious Store instance
- `config` (optional): Configuration object
  - `mode`: `"eager"` (default) or `"batched"`
  - `fps`: Frame rate for batched mode (default: 30)
  - `skippedEvents`: Array of event types to exclude from DevTools logging

**Returns:**

- `Provider`: React context provider component (pre-configured with your store)
- `useSelector`: Hook to select state slices
- `useNotify`: Hook to dispatch events

**Examples:**

```javascript
// Eager mode (immediate updates)
const { Provider, useSelector, useNotify } = createReactStore(store)

// Batched mode (30 FPS)
const { Provider, useSelector, useNotify } = createReactStore(store, {
  mode: "batched",
  fps: 30,
})

// Custom FPS for animations
const { Provider, useSelector, useNotify } = createReactStore(store, {
  mode: "batched",
  fps: 60,
  skippedEvents: ["update", "mousemove"], // Don't log these in DevTools
})
```

### `useNotify()`

Hook that returns a function to dispatch events.

**Returns:**

- `notify(type, payload?)`: Function to dispatch events

**Usage:**

```jsx
function TodoItem({ id }) {
  const notify = useNotify()

  // Simple event
  const handleToggle = () => notify("toggleTodo", id)

  // Event with complex payload
  const handleRename = (text) => notify("renameTodo", { id, text })

  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      <input onChange={(e) => handleRename(e.target.value)} />
    </div>
  )
}
```

### `useSelector(selector, equalityFn?)`

Hook to select and subscribe to state slices. Works exactly like `react-redux`'s `useSelector`.

**Parameters:**

- `selector`: Function that receives state and returns a slice
- `equalityFn` (optional): Custom equality function for optimization

**Usage:**

```jsx
function TodoList() {
  // Select a specific entity
  const task = useSelector((state) => state.task1)

  // Select derived data
  const completedCount = useSelector(
    (state) => Object.values(state).filter((task) => task.completed).length,
  )

  // With custom equality
  const tasks = useSelector(
    (state) => state.tasks,
    (prev, next) => prev === next, // Shallow equality
  )

  return <div>...</div>
}
```

---

## Update Modes

### Eager Mode (Default)

Best for most apps. Updates process immediately when you call `notify()`.

```javascript
const { Provider, useSelector, useNotify } = createReactStore(store)
```

**When to use:**

- ✅ Standard apps (forms, CRUD, dashboards)
- ✅ You want instant feedback on user actions
- ✅ You're not processing many events per second

### Batched Mode

Best for performance-critical apps. Updates process on a fixed timer (FPS).

```javascript
const { Provider, useSelector, useNotify } = createReactStore(store, {
  mode: "batched",
  fps: 30, // Process events 30 times per second
})
```

**When to use:**

- ✅ Games or animations
- ✅ High-frequency events (mouse tracking, real-time data)
- ✅ You want to batch multiple events into one React render
- ✅ Performance optimization is critical

**FPS Guidelines:**

- **60 FPS** - Smooth animations, games
- **30 FPS (default)** - Good balance for most real-time apps
- **15-20 FPS** - Live dashboards, lower CPU usage
- **5-10 FPS** - Background updates, status polling

---

## Redux DevTools Integration

Redux DevTools work automatically! Install the [browser extension](https://github.com/reduxjs/redux-devtools) to inspect:

- State snapshots
- Event history
- Time-travel debugging

**In batched mode**, events are automatically grouped by frame for cleaner DevTools logs.

```javascript
// Skip noisy events from DevTools
const { Provider, useSelector, useNotify } = createReactStore(store, {
  mode: "batched",
  fps: 30,
  skippedEvents: ["mousemove", "update"], // Don't log these
})
```

---

## Complete Example: Todo App

```javascript
// store.js
import { createStore } from "@inglorious/store"

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
        id: Date.now(),
        text: value,
        completed: false,
      })
    },
    toggleClick(entity, id) {
      const task = entity.tasks.find((t) => t.id === id)
      if (task) task.completed = !task.completed
    },
  },
}

const entities = {
  form: { type: "form", value: "" },
  list: { type: "list", tasks: [] },
}

export const store = createStore({ types, entities })
```

```javascript
// react-store.js
import { createReactStore } from "@inglorious/react-store"
import { store } from "./store"

export const { Provider, useSelector, useNotify } = createReactStore(store)
```

```jsx
// App.jsx
import { Provider } from "./react-store"
import TodoApp from "./TodoApp"

export default function App() {
  return (
    <Provider>
      <TodoApp />
    </Provider>
  )
}
```

```jsx
// TodoApp.jsx
import { useNotify, useSelector } from "./react-store"

export default function TodoApp() {
  const notify = useNotify()

  const formValue = useSelector((state) => state.form.value)
  const tasks = useSelector((state) => state.list.tasks)

  const handleSubmit = (e) => {
    e.preventDefault()
    notify("formSubmit", formValue)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={formValue}
          onChange={(e) => notify("inputChange", e.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => notify("toggleClick", task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## TypeScript Support

Full TypeScript support coming soon! For now, you can add type assertions:

```typescript
import type { RootState } from "./store"

const value = useSelector((state: RootState) => state.myCounter.value)
```

---

## Comparison to Plain react-redux

**What's the same:**

- `<Provider>` and `useSelector` work identically
- Full Redux DevTools support
- Same performance characteristics

**What's different:**

- ✅ Custom `useNotify` hook instead of `useDispatch`
- ✅ Batched mode option for performance
- ✅ Automatic `store.update()` handling
- ✅ Cleaner API for event-based state management

---

## FAQ

**Q: Can I use this with existing react-redux code?**  
A: Yes! The `Provider` and `useSelector` are compatible. You can gradually migrate to `useNotify`.

**Q: Should I use eager or batched mode?**  
A: Start with eager (default). Switch to batched if you notice performance issues or are building a game/real-time app.

**Q: Does this work with React Native?**  
A: Yes! It works anywhere `react-redux` works.

**Q: Can I use Redux middleware?**  
A: Use Inglorious Store middleware instead. See [@inglorious/store docs](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/store).

---

## License

MIT © [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

This is free and open-source software. Use it however you want!

---

## Contributing

Contributions welcome! Please read our [Contributing Guidelines](../../CONTRIBUTING.md) first.
