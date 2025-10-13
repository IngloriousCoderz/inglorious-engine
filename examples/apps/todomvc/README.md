# TodoMVC - Redux Compatibility Demo

A TodoMVC implementation using **[@inglorious/store](https://www.npmjs.com/package/@inglorious/store)** with standard **`react-redux`** bindings.

This demo shows how `@inglorious/store` is a **drop-in replacement for Redux**. You can adopt the entity-based, event-driven architecture without changing your React integration layer.

---

## ✨ Key Features

This implementation demonstrates:

1. **Redux Compatibility**: Uses standard `react-redux` (`Provider`, `useDispatch`, `useSelector`)
2. **Entity-Based State**: State organized into separate entities (`form`, `list`, `footer`)
3. **Event-Driven Architecture**: Components dispatch events, entities respond
4. **Eager Mode**: Updates happen immediately, just like Redux (no manual `update()` calls)

---

## 🎯 Why This Matters

**You can use @inglorious/store with your existing Redux knowledge and tools.**

- ✅ No need to learn new React hooks
- ✅ Works with existing `react-redux` code
- ✅ Easy migration path from Redux
- ✅ Redux DevTools support out of the box

**The only difference from Redux:**

- Write state logic as **types and entities** instead of switch-based reducers
- Get **immutability with Mutative** (no manual spreads)
- Benefit from **entity-based architecture** (reusable logic)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (recent version)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

```bash
pnpm install
```

### Running the Application

```bash
pnpm dev
```

The application will launch on `http://localhost:5173/`.

### Build for Production

```bash
pnpm build
```

---

## 📁 Project Structure

State management files are in `src/store/`:

| File                     | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `src/store/index.js`     | Store setup and react-redux integration    |
| `src/store/entities.js`  | Initial state for all entities             |
| `src/store/types.js`     | Event handlers (like reducers, but better) |
| `src/store/selectors.js` | Memoized selectors for derived state       |

---

## 🔍 How It Works

### Entity-Based State

Instead of one monolithic reducer, state is organized into **entities**:

```javascript
// src/store/entities.js
export const entities = {
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
```

### Event Handlers (Not Methods!)

**Important:** These look like methods, but they're **event handlers** in a pub/sub architecture.

When you dispatch an event, it's **broadcast to all entities**. Any entity with that event handler will process it.

```javascript
// src/store/types.js
export const types = {
  form: {
    // Event handler - runs when 'inputChange' event is broadcast
    inputChange(entity, value) {
      entity.value = value
    },
    // Event handler - runs when 'formSubmit' event is broadcast
    formSubmit(entity) {
      entity.value = ""
    },
  },

  list: {
    // This ALSO handles 'formSubmit' - same event, different entity!
    formSubmit(entity, value) {
      entity.tasks.push({
        id: Date.now(),
        text: value,
        completed: false,
      })
    },
    // Event handler - runs when 'toggleClick' event is broadcast
    toggleClick(entity, id) {
      const task = entity.tasks.find((t) => t.id === id)
      if (task) task.completed = !task.completed
    },
  },
}
```

**Key concept:** When you dispatch `{ type: 'formSubmit', payload: value }`, **both** the `form` and `list` entities respond because they both have `formSubmit` handlers.

### Using in Components

Standard `react-redux` patterns work:

```javascript
import { useDispatch, useSelector } from "react-redux"

function TodoInput() {
  const dispatch = useDispatch()
  const value = useSelector((state) => state.form.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: "formSubmit", payload: value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) =>
          dispatch({
            type: "inputChange",
            payload: e.target.value,
          })
        }
      />
    </form>
  )
}
```

---

## 🎭 Pub/Sub Event Architecture

**This is not OOP with methods—it's a pub/sub (publish/subscribe) system.**

When you dispatch an event, it's **broadcast to all entities** that have that event handler. Multiple entities can respond to the same event.

### Example: formSubmit Event

When you dispatch `formSubmit`:

1. The event is **broadcast** to all entities
2. The `form` entity has a `formSubmit` handler → it clears the input
3. The `list` entity also has a `formSubmit` handler → it adds a new task
4. Both handlers run automatically

This happens **without components knowing about each other**. The event system coordinates everything.

```javascript
// Component just broadcasts the event
dispatch({ type: "formSubmit", payload: inputValue })

// Multiple entities respond independently
// form entity: clears input
// list entity: adds task
```

**Why this is powerful:**

- ✅ Decoupled - entities don't know about each other
- ✅ Reactive - add new entities that respond to existing events
- ✅ Reusable - same event can trigger different behaviors
- ✅ Testable - test each entity handler independently

---

## 💡 Comparison with Redux and Redux Toolkit

### Traditional Redux:

```javascript
// Action creators
const addTodo = (text) => ({ type: "ADD_TODO", payload: text })
const clearInput = () => ({ type: "CLEAR_INPUT" })

// Reducers with switch statements
function todosReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), text: action.payload }]
    default:
      return state
  }
}

function inputReducer(state, action) {
  switch (action.type) {
    case "CLEAR_INPUT":
      return ""
    case "INPUT_CHANGE":
      return action.payload
    default:
      return state
  }
}

// Manual immutability
return [...state, newItem]
```

### Redux Toolkit (RTK):

```javascript
import { createSlice, createAction } from "@reduxjs/toolkit"

// Cross-slice actions need createAction
const formSubmit = createAction("form/submit")

// Separate slices
const formSlice = createSlice({
  name: "form",
  initialState: { value: "" },
  reducers: {
    inputChange: (state, action) => {
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
    // Builder callback notation for cross-slice actions
    builder.addCase(formSubmit, (state) => {
      state.value = ""
    })
  },
})

const listSlice = createSlice({
  name: "list",
  initialState: { tasks: [] },
  reducers: {
    // Regular reducers here
  },
  extraReducers: (builder) => {
    // Cross-slice action handling
    builder.addCase(formSubmit, (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload,
      })
    })
  },
})

// Need to distinguish:
// - reducers vs extraReducers
// - createAction for shared actions
// - builder.addCase notation
```

**RTK Complexity:**

- ❌ Separate slices can't easily coordinate
- ❌ Cross-slice actions require `createAction()`
- ❌ Must distinguish `reducers` vs `extraReducers`
- ❌ Builder callback notation for extraReducers
- ❌ More boilerplate for coordination

### With @inglorious/store:

```javascript
// Event handlers in a pub/sub system (NOT methods!)
const types = {
  list: {
    // This is an EVENT HANDLER - runs when 'formSubmit' is broadcast
    formSubmit(entity, value) {
      entity.tasks.push({ id: Date.now(), text: value })
    },
  },

  form: {
    inputChange(entity, value) {
      entity.value = value
    },
    // This ALSO handles 'formSubmit' - multiple entities respond!
    formSubmit(entity) {
      entity.value = ""
    },
  },
}

// Mutative syntax (but immutable under the hood)
entity.tasks.push(newItem)
```

**Benefits:**

- ✅ No switch statements
- ✅ No action creators or `createAction()`
- ✅ No distinction between reducers/extraReducers
- ✅ No builder callback notation
- ✅ **Multiple entities respond to same event naturally (pub/sub!)**
- ✅ Reusable, testable event handlers
- ✅ Way simpler mental model
- ⚠️ Less type-safe (for now), but much easier to use

---

## 🐛 Debugging with Redux DevTools

This demo includes Redux DevTools integration:

1. Install **[Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)**
2. Open the app and launch DevTools
3. See every event as an Action
4. Time-travel through state changes

---

## ⚠️ Limitations of This Approach

This demo uses **eager mode** with `react-redux`, which has one limitation:

**Event chaining doesn't work.** If an event handler dispatches another event, only the first event processes.

```javascript
// This won't work in eager mode:
const types = {
  list: {
    async fetchTodos(entity, payload, api) {
      const todos = await fetch("/api/todos").then((r) => r.json())
      api.notify("todosReceived", todos) // ❌ This event is ignored
    },
  },
}
```

**Solution:** Use batched mode with `@inglorious/react-store`. See the `todomvc-cs` example for this pattern.

---

## 🔄 When to Use This Approach

**✅ Use this (react-redux) version if:**

- Migrating from Redux
- Team familiar with Redux patterns
- Synchronous operations only
- Want minimal changes to existing code

**⚠️ Consider todomvc-cs (@inglorious/react-store) if you need:**

- Async operations (API calls)
- Event chaining (events triggering other events)
- Batched updates
- Full @inglorious/store feature set

---

## 📚 Learn More

- **[@inglorious/store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/store)** - Core state management docs
- **[todomvc-cs](../todomvc-cs)** - Same app with `@inglorious/react-store` (batched mode, event chaining)
- **[@inglorious/react-store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/react-store)** - React bindings with additional features

---

## 📄 License

MIT © [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)
