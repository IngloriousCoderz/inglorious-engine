# TodoMVC-RT - Real-Time Collaboration

A TodoMVC implementation using **[@inglorious/store](https://www.npmjs.com/package/@inglorious/store)** with **[@inglorious/react-store](https://www.npmjs.com/package/@inglorious/react-store)** bindings, plus the `multiplayerMiddleware` which makes real-time collaboration trivial.

---

Please refer to the docs of the [TodoMVC](../todomvc/README.md) example. The only difference is an additional middleware:

```javascript
export const middlewares = [multiplayerMiddleware()]
```

This middleware, just like the `devtools` middleware, can ignore certain events using three optional configuration parameters:

- `whitelist`: an array of event types that specifies which events to be sent to the server
- `blacklist`: an array of event types that specifies which events to ignore
- `filter`: a predicate that, given the event, specifies if it should be sent

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (recent version)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

```bash
pnpm install
```

### 1. Start the Real-Time Server

The app uses `@inglorious/server` for real-time backend:

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

Open two browser windows on the same address and see multiplayer in action!

---

## 📁 Project Structure

State management files are in `src/store/`:

| File                       | Purpose                                     |
| -------------------------- | ------------------------------------------- |
| `src/store/index.js`       | Store setup with `@inglorious/react-store`  |
| `src/store/entities.js`    | Initial state for all entities              |
| `src/store/types.js`       | **Synchronous event handlers** 🤯           |
| `src/store/middlewares.js` | Functions that augment the store's behavior |
| `src/store/selectors.js`   | Memoized selectors for derived state        |

---

## 📚 Learn More

- **[@inglorious/store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/store)** - Core state management docs
- **[@inglorious/react-store](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/react-store)** - React bindings documentation
- **[todomvc](../todomvc)** - Basic version with `react-redux` (synchronous only)
- **[Inglorious Engine](https://github.com/IngloriousCoderz/inglorious-engine)** - Full game engine

---

## 📄 License

MIT © [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)
