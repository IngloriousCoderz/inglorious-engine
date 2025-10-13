# TodoMVC-CS - Client-Server with Async Operations

A TodoMVC implementation using **[@inglorious/store](https://www.npmjs.com/package/@inglorious/store)** with **[@inglorious/react-store](https://www.npmjs.com/package/@inglorious/react-store)** bindings, demonstrating **async API calls** and **event chaining** with a RESTful backend.

This demo showcases the full power of batched mode and cascading notifications for real-world client-server applications.

---

## ✨ Key Features

This implementation demonstrates:

1. **useNotify Hook**: Cleaner API than `useDispatch`
2. **Batched Mode**: Explicit control over when state updates (20 FPS default)
3. **Event Chaining**: Async handlers trigger sync handlers automatically
4. **RESTful API Integration**: Real server communication with `json-server`
5. **Async/Sync Separation**: Clean split between I/O and state updates

---

## 🎯 Why Batched Mode for Client-Server Apps

**Event chaining is essential for async operations.**

When fetching data from an API, you need two separate handlers:

1. **Async handler** - performs the fetch
2. **Sync handler** - updates the state with the result

In eager mode, only the first event processes. **Batched mode allows both to run in the same update cycle.**

### The Pattern:

```javascript
const types = {
  list: {
    // 1. Async handler - fetches from API
    async formSubmit(entity, value, api) {
      const createdTask = await client.createTask({ text: value })

      // 2. Trigger sync handler (processes in same update cycle!)
      api.notify("taskCreated", createdTask)
    },

    // 3. Sync handler - updates state
    taskCreated(entity, createdTask) {
      entity.tasks.push(createdTask)
    },
  },
}
```

**Why this pattern:**

- ✅ Separation of concerns (fetch vs state update)
- ✅ Each handler is independently testable
- ✅ Clean, declarative flow
- ✅ Both events process in one React render

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (recent version)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

```bash
pnpm install
```

### 1. Start the Mock API Server

The app uses `json-server` for a RESTful backend:

```bash
pnpm api
```

This starts the API server on `http://localhost:3000`.

### 2. Start the Frontend Application

In a separate terminal:

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

| File                     | Purpose                                           |
| ------------------------ | ------------------------------------------------- |
| `src/store/index.js`     | Store setup with **batched mode** and `useNotify` |
| `src/store/entities.js`  | Initial state for all entities                    |
| `src/store/types.js`     | **Async event handlers** with event chaining      |
| `src/store/selectors.js` | Memoized selectors for derived state              |
| `src/services/client.js` | API client functions                              |

---

## 🔍 How It Works

### Batched Mode Configuration

```javascript
// src/store/index.js
import { createStore } from "@inglorious/store"
import { createReactStore } from "@inglorious/react-store"

const store = createStore({
  types,
  entities,
  mode: "batched", // Required for event chaining!
})

export const { Provider, useSelector, useNotify } = createReactStore(store, {
  mode: "batched",
  fps: 20, // Sweet spot for responsive input handling
  skippedEvents: ["create"], // Don't log these in DevTools
})
```

**Why 20 FPS?**

- Fast enough for snappy input handling
- Efficient CPU usage
- Good balance for most apps

### Async Event Chaining Pattern

The key pattern: **async handler → api.notify() → sync handler**

```javascript
// src/store/types.js
import * as client from "../services/client"

export const types = {
  list: {
    // Load todos from server on mount
    async loadTasks(entity, payload, api) {
      entity.loading = true
      const tasks = await client.getTasks()
      api.notify("tasksLoaded", tasks)
    },

    tasksLoaded(entity, tasks) {
      entity.tasks = tasks
      entity.loading = false
    },

    // Create new todo
    async formSubmit(entity, value, api) {
      const createdTask = await client.createTask({ text: value })
      api.notify("taskCreated", createdTask)
    },

    taskCreated(entity, createdTask) {
      entity.tasks.push(createdTask)
    },

    // Update todo
    async toggleClick(entity, id, api) {
      const task = entity.tasks.find((t) => t.id === id)
      const updatedTask = await client.updateTask(id, {
        completed: !task.completed,
      })
      api.notify("taskUpdated", updatedTask)
    },

    taskUpdated(entity, updatedTask) {
      const task = entity.tasks.find((t) => t.id === updatedTask.id)
      if (task) {
        task.completed = updatedTask.completed
      }
    },

    // Delete todo
    async deleteClick(entity, id, api) {
      await client.deleteTask(id)
      api.notify("taskDeleted", id)
    },

    taskDeleted(entity, id) {
      const index = entity.tasks.findIndex((t) => t.id === id)
      if (index !== -1) {
        entity.tasks.splice(index, 1)
      }
    },
  },
}
```

### Using in Components

```javascript
import { useNotify, useSelector } from "../store"

function TodoList() {
  const notify = useNotify()
  const tasks = useSelector((state) => state.list.tasks)
  const loading = useSelector((state) => state.list.loading)

  // Load tasks on mount
  useEffect(() => {
    notify("loadTasks")
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
```

---

## 🔄 Complete CRUD Flow

### Create (POST)

```javascript
// 1. User submits form
notify('formSubmit', inputValue)

// 2. Async handler sends POST request
async formSubmit(entity, value, api) {
  const created = await client.createTask({ text: value })
  api.notify('taskCreated', created) // 3. Trigger sync handler
}

// 4. Sync handler updates state
taskCreated(entity, created) {
  entity.tasks.push(created)
}
```

### Read (GET)

```javascript
// 1. Component loads
notify('loadTasks')

// 2. Async handler fetches data
async loadTasks(entity, payload, api) {
  const tasks = await client.getTasks()
  api.notify('tasksLoaded', tasks) // 3. Trigger sync handler
}

// 4. Sync handler stores data
tasksLoaded(entity, tasks) {
  entity.tasks = tasks
}
```

### Update (PUT/PATCH)

```javascript
// 1. User toggles task
notify('toggleClick', taskId)

// 2. Async handler sends update
async toggleClick(entity, id, api) {
  const task = entity.tasks.find(t => t.id === id)
  const updated = await client.updateTask(id, { completed: !task.completed })
  api.notify('taskUpdated', updated)
}

// 3. Sync handler updates state
taskUpdated(entity, updated) {
  const task = entity.tasks.find(t => t.id === updated.id)
  if (task) task.completed = updated.completed
}
```

### Delete (DELETE)

```javascript
// 1. User deletes task
notify('deleteClick', taskId)

// 2. Async handler sends DELETE
async deleteClick(entity, id, api) {
  await client.deleteTask(id)
  api.notify('taskDeleted', id)
}

// 3. Sync handler removes from state
taskDeleted(entity, id) {
  const index = entity.tasks.findIndex(t => t.id === id)
  entity.tasks.splice(index, 1)
}
```

---

## 💡 Why Event Chaining?

### Without Event Chaining (doesn't work in eager mode):

```javascript
// ❌ This only processes the async handler
async formSubmit(entity, value) {
  const task = await fetch('/api/tasks', { method: 'POST', ... })
  entity.tasks.push(task) // State update in async handler - not ideal
}
```

**Problems:**

- ❌ Mixing concerns (fetch + state update)
- ❌ Harder to test
- ❌ Can't reuse the sync logic

### With Event Chaining (batched mode):

```javascript
// ✅ Separation of concerns
async formSubmit(entity, value, api) {
  const task = await fetch('/api/tasks', { method: 'POST', ... })
  api.notify('taskCreated', task) // Trigger separate handler
}

taskCreated(entity, task) {
  entity.tasks.push(task) // Pure state update
}
```

**Benefits:**

- ✅ Async handler only handles I/O
- ✅ Sync handler only handles state
- ✅ Each is independently testable
- ✅ Can reuse `taskCreated` from other sources (WebSocket, local creation, etc.)

---

## 🎭 Pub/Sub Event Architecture

Just like the basic TodoMVC, this uses a **pub/sub system**. Multiple entities can respond to the same event:

```javascript
const types = {
  list: {
    taskCreated(entity, task) {
      entity.tasks.push(task)
    },
  },

  notification: {
    taskCreated(entity, task) {
      entity.message = `Created: ${task.text}`
      entity.show = true
    },
  },

  analytics: {
    taskCreated(entity, task) {
      entity.totalCreated++
    },
  },
}

// One event, three entities respond!
api.notify("taskCreated", newTask)
```

---

## 💡 Comparison with Redux Toolkit

### Redux Toolkit (createAsyncThunk):

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk
const fetchTodos = createAsyncThunk("list/fetchTodos", async () => {
  const response = await fetch("/api/todos")
  return response.json()
})

// Slice with three separate handlers
const listSlice = createSlice({
  name: "list",
  initialState: { tasks: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.tasks = action.payload
        state.loading = false
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
  },
})

// Need to distinguish pending/fulfilled/rejected
```

**RTK Complexity:**

- ❌ Need `createAsyncThunk`
- ❌ Three separate handlers (pending/fulfilled/rejected)
- ❌ Builder notation with `extraReducers`
- ❌ More boilerplate
- ❌ Harder to coordinate with other slices

### With @inglorious/store:

```javascript
const types = {
  list: {
    async loadTasks(entity, payload, api) {
      entity.loading = true
      const tasks = await client.getTasks()
      api.notify("tasksLoaded", tasks)
    },

    tasksLoaded(entity, tasks) {
      entity.tasks = tasks
      entity.loading = false
    },
  },
}

// Just two handlers - async and sync
```

**Benefits:**

- ✅ No `createAsyncThunk`
- ✅ Two simple handlers instead of three
- ✅ No builder notation
- ✅ Less boilerplate
- ✅ Natural error handling with try/catch
- ✅ Other entities can easily respond to `tasksLoaded`

---

## 🐛 Debugging with Redux DevTools

Full Redux DevTools support with event grouping:

1. Install **[Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)**
2. Events are grouped by update cycle (batched mode)
3. Use `skippedEvents` to reduce noise:

```javascript
const { Provider, useSelector, useNotify } = createReactStore(store, {
  mode: "batched",
  fps: 20,
  skippedEvents: ["create", "inputChange"], // Don't log these
})
```

---

## ⚙️ FPS Configuration

The default 20 FPS is a sweet spot for most apps, but you can adjust:

```javascript
createReactStore(store, {
  mode: "batched",
  fps: 60  // For smooth animations
  fps: 30  // Standard game speed
  fps: 20  // Default - good for apps (responsive input)
  fps: 10  // Lower CPU usage
})
```

**Guidelines:**

- **60 FPS** - Games, smooth animations
- **30 FPS** - Standard real-time apps
- **20 FPS** - Default, best balance for input handling
- **10 FPS** - Background updates, lower priority

---

## 🔄 When to Use This Approach

**✅ Use this (batched + event chaining) if:**

- App communicates with a server (API calls)
- Need async operations (data fetching)
- Want separation of concerns (I/O vs state)
- Building real-time or collaborative features
- Want clean, testable async patterns

**⚠️ Consider basic todomvc (react-redux) if:**

- No server communication
- All synchronous operations
- Prefer familiar Redux patterns
- Don't need event chaining

---

## 🎓 Key Takeaways

1. **Batched mode is required** for event chaining to work
2. **Separate async I/O from state updates** - use two handlers
3. **20 FPS default** provides responsive input with good performance
4. **Event chaining is simpler** than Redux Toolkit's async thunks
5. **Pub/sub enables coordination** - multiple entities can respond to async results

---

## 📚 Learn More

- **[@inglorious/store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/store)** - Core state management docs
- **[@inglorious/react-store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/react-store)** - React bindings documentation
- **[todomvc](../todomvc)** - Basic version with `react-redux` (synchronous only)
- **[Inglorious Engine](https://github.com/IngloriousCoderz/inglorious-engine)** - Full game engine

---

## 📄 License

MIT © [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)
