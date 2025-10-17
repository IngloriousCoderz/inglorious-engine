# TodoMVC - TypeScript Demo

A TodoMVC implementation using **[@inglorious/store](https://www.npmjs.com/package/@inglorious/store)** with **[@inglorious/react-store](https://www.npmjs.com/package/@inglorious/react-store)** bindings and **full TypeScript support**.

This demo shows how `@inglorious/store` works seamlessly with TypeScript, providing type safety while maintaining the simple, event-driven architecture.

---

## ✨ Key Features

This implementation demonstrates:

1. **Custom React Hooks**: Uses `@inglorious/react-store` (`Provider`, `useNotify`, `useSelector`)
2. **Full TypeScript Support**: Complete type safety for entities, events, and state
3. **Entity-Based State**: State organized into separate entities (`form`, `list`, `footer`)
4. **Event-Driven Architecture**: Components use `useNotify` to broadcast events, entities respond
5. **Eager Mode**: Updates happen immediately (no manual `update()` calls)

---

## 🎯 Why This Matters

**You can use @inglorious/store with TypeScript for type-safe state management.**

- ✅ Type-safe entity definitions
- ✅ Typed event handlers
- ✅ Full IDE autocomplete and IntelliSense
- ✅ Catch errors at compile time
- ✅ Clean `useNotify` hook instead of `useDispatch`
- ✅ Redux DevTools support out of the box

**The benefits of @inglorious/store with type safety:**

- Write state logic as **typed entities** instead of switch-based reducers
- Get **immutability with Mutative** (no manual spreads)
- Benefit from **entity-based architecture** with TypeScript inference
- Use **`useNotify`** for cleaner event dispatching
- Optional type safety - use as much or as little as you want

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

| File                       | Purpose                                           |
| -------------------------- | ------------------------------------------------- |
| `src/store/index.ts`       | Store setup and react-store integration           |
| `src/store/entities.ts`    | Initial state for all entities                    |
| `src/store/types.ts`       | Event handlers (like reducers, but more powerful) |
| `src/store/middlewares.ts` | Functions that augment the store's behavior       |
| `src/store/selectors.ts`   | Memoized selectors for derived state              |
| `src/types/index.d.ts`     | TypeScript type definitions                       |

---

## 🔍 How It Works

### Type Definitions

Define your entity types once and get type safety everywhere:

```typescript
// src/types/index.d.ts
import { BaseEntity } from "@inglorious/store"

export type Filter = "all" | "active" | "completed"

// Define the task structure
export interface Task {
  id: number
  text: string
  completed?: boolean
}

// Define your entity types
export interface FormEntity extends BaseEntity {
  type: "form"
  value: string
}

export interface ListEntity extends BaseEntity {
  type: "list"
  tasks: Task[]
}

export interface FooterEntity extends BaseEntity {
  type: "footer"
  activeFilter: Filter
}

// Union type of all entities
export type TodoListEntity = FormEntity | ListEntity | FooterEntity

// State type with known entity IDs
export interface TodoListState {
  form: FormEntity
  list: ListEntity
  footer: FooterEntity
  [id: string]: TodoListEntity
}

// Types configuration - defines exact handler signatures
export interface TodoListTypes {
  form: {
    inputChange: (entity: FormEntity, value: string) => void
    formSubmit: (entity: FormEntity) => void
  }

  list: {
    formSubmit: (entity: ListEntity, value: string) => void
    toggleClick: (entity: ListEntity, id: number) => void
    deleteClick: (entity: ListEntity, id: number) => void
    clearClick: (entity: ListEntity, _payload: void) => void
  }

  footer: {
    filterClick: (entity: FooterEntity, filter: Filter) => void
  }
}
```

### Typed Entity-Based State

With TypeScript, your entities are fully typed:

```typescript
// src/store/entities.ts
import type { TodoListState } from "../types"

export const entities: TodoListState = {
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

### Typed Event Handlers

Event handlers are fully typed with specific entity types and payloads:

```typescript
// src/store/types.ts
import type { TodoListTypes } from "../types"

export const types: TodoListTypes = {
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
    deleteClick(entity, id) {
      const index = entity.tasks.findIndex((t) => t.id === id)
      if (index !== -1) {
        entity.tasks.splice(index, 1)
      }
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
```

### Creating the Typed Store

```typescript
// src/store/index.ts
import { createStore, type TypesConfig } from "@inglorious/store"
import { createReactStore } from "@inglorious/react-store"
import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { types } from "./types"
import type { TodoListEntity, TodoListState } from "../types"

// Create the store with type casting for the types configuration
export const store = createStore<TodoListEntity, TodoListState>({
  types: types as unknown as TypesConfig<TodoListEntity>,
  entities,
  middlewares,
})

// React bindings automatically infer types from the store
export const { Provider, useSelector, useNotify } = createReactStore(store)
```

**Note:** The `as unknown as TypesConfig<TodoListEntity>` cast is needed because the generic `TypesConfig` type is intentionally permissive to allow specific entity types in handlers. Your `TodoListTypes` interface provides the actual type safety in your code.

### Using in Components

Using `@inglorious/react-store` hooks with TypeScript:

```typescript
import { useNotify, useSelector } from "./store"
import type { TodoListState } from "../types"

function TodoInput() {
  const notify = useNotify()
  const value = useSelector((state: TodoListState) => state.form.value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    notify("formSubmit", value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => notify("inputChange", e.target.value)}
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

```typescript
// Component just broadcasts the event using notify
notify("formSubmit", inputValue)

// Multiple entities respond independently
// form entity: clears input
// list entity: adds task
```

**Why this is powerful:**

- ✅ Decoupled - entities don't know about each other
- ✅ Reactive - add new entities that respond to existing events
- ✅ Reusable - same event can trigger different behaviors
- ✅ Testable - test each entity handler independently
- ✅ Type-safe - TypeScript catches errors at compile time

---

## 💡 TypeScript Benefits

### Full Type Safety

With the `TodoListTypes` interface, you get complete type checking:

```typescript
// ✅ TypeScript knows exact entity types
const types: TodoListTypes = {
  form: {
    inputChange(entity, value) {
      entity.value = value // entity is FormEntity, value is string
    },
  },
}

// ✅ State is fully typed
const value = useSelector((state: TodoListState) => state.form.value) // Type: string
const tasks = useSelector((state: TodoListState) => state.list.tasks) // Type: Task[]

// ✅ Autocomplete works everywhere
entity.tasks.push({ id: 1, text: "...", completed: false })

// ❌ TypeScript prevents mistakes
entity.tasks.push({ id: 1 }) // Error: missing 'text'

// ❌ TypeScript catches wrong entity types
const types: TodoListTypes = {
  form: {
    inputChange(entity: ListEntity, value: string) {
      // Error: should be FormEntity
      entity.value = value
    },
  },
}
```

### Precise Type Checking

Define a types interface for complete type safety:

```typescript
// Define exact handler signatures
interface TodoListTypes {
  form: {
    inputChange: (entity: FormEntity, value: string) => void
    formSubmit: (entity: FormEntity) => void
  }
  list: {
    formSubmit: (entity: ListEntity, value: string) => void
    toggleClick: (entity: ListEntity, id: number) => void
    deleteClick: (entity: ListEntity, id: number) => void
    clearClick: (entity: ListEntity) => void
  }
  footer: {
    filterClick: (entity: FooterEntity, filter: Filter) => void
  }
}

// Use it in your types configuration
const types: TodoListTypes = {
  form: {
    inputChange(entity, value) {
      entity.value = value // Fully typed!
    },
    formSubmit(entity) {
      entity.value = ""
    },
  },
  list: {
    formSubmit(entity, value) {
      entity.tasks.push({ id: Date.now(), text: value, completed: false })
    },
    toggleClick(entity, id) {
      const task = entity.tasks.find((t) => t.id === id)
      if (task) task.completed = !task.completed
    },
    deleteClick(entity, id) {
      const index = entity.tasks.findIndex((t) => t.id === id)
      if (index !== -1) {
        entity.tasks.splice(index, 1)
      }
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
```

### IDE Support

- Full autocomplete for entity properties
- Inline documentation
- Go-to-definition navigation
- Refactoring support
- Error highlighting

---

## 💡 Comparison with Redux and Redux Toolkit

### Traditional Redux with TypeScript:

```typescript
// Action types
const ADD_TODO = "ADD_TODO" as const
const CLEAR_INPUT = "CLEAR_INPUT" as const

// Action creators with types
interface AddTodoAction {
  type: typeof ADD_TODO
  payload: string
}

interface ClearInputAction {
  type: typeof CLEAR_INPUT
}

type TodoAction = AddTodoAction | ClearInputAction

// Reducers with manual immutability
function todosReducer(state: Task[], action: TodoAction): Task[] {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ]
    default:
      return state
  }
}
```

### Redux Toolkit (RTK) with TypeScript:

```typescript
import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit"

// Cross-slice actions need createAction with types
const formSubmit = createAction<string>("form/submit")

// Separate slices with generic types
const formSlice = createSlice({
  name: "form",
  initialState: { value: "" },
  reducers: {
    inputChange: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(formSubmit, (state) => {
      state.value = ""
    })
  },
})

const listSlice = createSlice({
  name: "list",
  initialState: { tasks: [] as Task[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(formSubmit, (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload,
      })
    })
  },
})
```

**RTK TypeScript Complexity:**

- ❌ Generic types everywhere (`PayloadAction<T>`)
- ❌ Need to type initial state explicitly
- ❌ Separate slices can't easily coordinate
- ❌ Cross-slice actions require `createAction<T>()`
- ❌ Must distinguish `reducers` vs `extraReducers`
- ❌ More boilerplate for type safety

### With @inglorious/store + TypeScript:

```typescript
// Define types once
interface FormEntity extends BaseEntity {
  type: "form"
  value: string
}

// Event handlers with simple types
const types = {
  form: {
    inputChange(entity, value: string) {
      entity.value = value
    },
    formSubmit(entity) {
      entity.value = ""
    },
  },

  list: {
    formSubmit(entity, value: string) {
      entity.tasks.push({ id: Date.now(), text: value, completed: false })
    },
  },
}

// Mutative syntax (but immutable under the hood)
entity.tasks.push(newItem)
```

**Benefits:**

- ✅ Simple type annotations where needed
- ✅ No generic types like `PayloadAction<T>`
- ✅ No action creators or `createAction<T>()`
- ✅ No distinction between reducers/extraReducers
- ✅ **Multiple entities respond to same event naturally (pub/sub!)**
- ✅ Type safety without the boilerplate
- ✅ Way simpler mental model

---

## 🐛 Debugging with Redux DevTools

This demo includes Redux DevTools integration with the `devtools` middleware:

1. Install **[Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)**
2. Open the app and launch DevTools
3. See every event as an Action
4. Time-travel through state changes

The middleware can ignore certain events using three optional configuration parameters:

- `whitelist`: an array of event types that specifies which events to log
- `blacklist`: an array of event types that specifies which events to ignore
- `filter`: a predicate that, given the event, specifies if it should be logged

---

## 📚 Learn More

- **[@inglorious/store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/store)** - Core state management docs
- **[@inglorious/react-store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/react-store)** - React bindings documentation
- **[todomvc](../todomvc)** - Same app using `react-redux` instead of `@inglorious/react-store` (JavaScript version)
- **[todomvc-cs](../todomvc-cs)** - Same app with async requests towards a RESTful service
- **[todomvc-rt](../todomvc-rt)** - Same app with real-time collaboration

---

## 📄 License

MIT © [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)
