# TodoMVC-ECO - Resource-Optimized Client-Server

A TodoMVC implementation using **[@inglorious/store](https://www.npmjs.com/package/@inglorious/store)** with **[@inglorious/react-store](https://www.npmjs.com/package/@inglorious/react-store)** bindings, optimized for **minimal resource consumption** while maintaining responsive user input.

This demo showcases a hybrid approach: using React local state for immediate feedback on high-frequency updates, while keeping the store for server synchronization at a lower update rate (5 FPS).

---

## ✨ Key Features

This implementation demonstrates:

1. **Hybrid State Management**: React `useState` for form input, store for server state
2. **Ultra-Low FPS**: 5 FPS update loop (vs 20 FPS default) for reduced CPU/battery usage
3. **Responsive Input**: Form state updates immediately with React, not affected by FPS
4. **Deferred Updates**: Other operations (add, toggle, delete) update on the slower 5 FPS loop
5. **Server Sync**: All changes still sync to the backend, just with slight delay

---

## 🎯 The Optimization Strategy

**Trade-off:** Instant form input responsiveness for lower resource consumption everywhere else.

**Why this works:**

- Users type at ~5-10 characters per second (well below 5 FPS)
- Form input with React state feels instant
- Other operations (adding, toggling, deleting) don't require frame-perfect responsiveness
- 5 FPS is still fast enough (~200ms) to feel snappy
- Huge CPU and battery savings on mobile and low-end devices

### The Approach:

```javascript
// Form state lives in React (immediate feedback)
const [inputValue, setInputValue] = useState("")

// Store handles server sync at 5 FPS
const notify = useNotify()

const handleSubmit = () => {
  notify("formSubmit", inputValue)
  setInputValue("") // Clear input immediately
}
```

**Result:**

- User types → React updates instantly
- Form clears → React updates instantly
- Server sync happens → Store at 5 FPS

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

| File                     | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| `src/store/index.js`     | Store setup with **5 FPS batched mode**  |
| `src/store/entities.js`  | Initial state for server-synced entities |
| `src/store/types.js`     | Async event handlers                     |
| `src/store/selectors.js` | Memoized selectors for derived state     |
| `src/services/client.js` | API client functions                     |

---

## 🔍 How It Works

### Ultra-Low FPS Configuration

```javascript
// src/store/index.js
import { createStore } from "@inglorious/store"
import { createReactStore } from "@inglorious/react-store"

const store = createStore({
  types,
  entities,
  mode: "batched",
})

export const { Provider, useSelector, useNotify } = createReactStore(store, {
  mode: "batched",
  fps: 5, // Ultra-low for battery/CPU savings
  skippedEvents: ["create"],
})
```

**Why 5 FPS?**

- ~200ms update cycle
- Still feels snappy (perceptually responsive)
- 4x less CPU usage than 20 FPS
- Significant battery savings on mobile
- Acceptable for most non-animation use cases

### Hybrid State Pattern

```javascript
import { useState } from "react"
import { useNotify, useSelector } from "../store"

function TodoForm() {
  // Local React state for instant feedback
  const [inputValue, setInputValue] = useState("")

  // Store for server sync (updates at 5 FPS)
  const notify = useNotify()
  const serverTasks = useSelector((state) => state.list.tasks)

  const handleChange = (e) => {
    // Instant update with React
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Notify store for server sync
    notify("formSubmit", inputValue)
    // Clear input immediately with React
    setInputValue("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={handleChange}
        placeholder="Add a task..."
      />
      <button type="submit">Add</button>
    </form>
  )
}
```

### Server Handlers (5 FPS Update Loop)

```javascript
// src/store/types.js
import * as client from "../services/client"

export const types = {
  list: {
    // Create new todo
    async formSubmit(entity, value, api) {
      const createdTask = await client.createTask({ text: value })
      api.notify("taskCreated", createdTask)
    },

    taskCreated(entity, createdTask) {
      entity.tasks.push(createdTask)
    },

    // Toggle todo (slight delay is acceptable)
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

    // Delete todo (slight delay is acceptable)
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

---

## 💡 FPS Trade-offs

### 20 FPS (todomvc-cs - Default)

- ✅ All operations feel instant
- ✅ Best user experience
- ❌ Higher CPU usage
- ❌ More battery drain
- **Best for:** Desktop apps, constant interaction

### 5 FPS (todomvc-eco - This Demo)

- ✅ 4x less CPU usage
- ✅ Significant battery savings
- ✅ Form input still feels instant (React local state)
- ⚠️ ~200ms delay on add/toggle/delete (acceptable)
- **Best for:** Mobile, low-end devices, background tasks

### When to Choose Each:

| Scenario                   | 20 FPS | 5 FPS |
| -------------------------- | ------ | ----- |
| Desktop web app            | ✅     | ⚠️    |
| Mobile app                 | ⚠️     | ✅    |
| Real-time collaboration    | ✅     | ❌    |
| Simple CRUD                | ⚠️     | ✅    |
| High-frequency interaction | ✅     | ❌    |
| Background sync            | ❌     | ✅    |

---

## 🎯 User Experience at 5 FPS

**What feels instant (React state):**

- Typing in the form
- Form clearing after submit
- Input field clearing

**What has ~200ms delay (5 FPS store loop):**

- New task appearing in list
- Task toggle animation
- Task deletion

**Is this acceptable?**
Yes! The delay is barely noticeable because:

- Users expect network latency anyway
- Optimistic UI updates (local state) provide instant feedback
- The actual operations are happening; just batched
- Mobile users typically accept this trade-off for battery life

---

## 🔄 Comparison: todomvc-cs vs todomvc-eco

| Aspect               | todomvc-cs (20 FPS)  | todomvc-eco (5 FPS)     |
| -------------------- | -------------------- | ----------------------- |
| **Update Frequency** | 20 FPS               | 5 FPS                   |
| **CPU Usage**        | Baseline             | ~25% of baseline        |
| **Battery Impact**   | Normal               | Significant savings     |
| **Form Response**    | 20 FPS loop          | React state (instant)   |
| **List Updates**     | Instant              | ~200ms delay            |
| **Best For**         | Desktop, normal apps | Mobile, low-power       |
| **User Experience**  | Optimal              | Good (slightly delayed) |

---

## 🎓 Key Insights

1. **Hybrid approach works well** - Different parts of state, different update rates
2. **FPS tuning is powerful** - 5x reduction in update rate = ~4x CPU savings
3. **React local state is underrated** - Perfect for high-frequency input
4. **Users accept delays if feedback is instant** - Local state provides that
5. **Battery life matters** - Mobile users will prefer todomvc-eco
6. **Batched mode enables flexibility** - Easy to adjust FPS without code changes

---

## ⚙️ Customizing FPS

Adjust the FPS based on your target devices:

```javascript
createReactStore(store, {
  mode: "batched",
  fps: 5, // Ultra-low (battery-optimized)
  fps: 10, // Low (good balance)
  fps: 20, // Default (responsive)
  fps: 30, // High (smooth animations)
})
```

**Guidelines:**

- **Mobile/Low-power**: 5-10 FPS
- **Typical apps**: 10-20 FPS
- **Games/Animations**: 30-60 FPS

---

## 📚 Learn More

- **[todomvc-cs](../todomvc-cs)** - Full 20 FPS version (standard responsiveness)
- **[todomvc](../todomvc)** - Synchronous version with `react-redux`
- **[@inglorious/react-store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/react-store)** - React bindings documentation
- **[@inglorious/store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/store)** - Core state management docs

---

## 📄 License

MIT © [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)
