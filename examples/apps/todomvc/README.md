# Inglorious TodoMVC Demo

This repository hosts a demonstration application built using the **[@inglorious/react-store](https://www.npmjs.com/package/@inglorious/react-store)** and **[@inglorious/store](https://www.npmjs.com/package/@inglorious/store)** state management libraries.

The goal of this demo is to showcase how to implement a classic, stateful application (TodoMVC) using an **entity-based, event-driven architecture** as a replacement for traditional Redux.

## ✨ Key Architectural Takeaways

This demo highlights the core features that differentiate `@inglorious/store` from standard Redux and React-Redux:

1. **Multiple State Entities**: The application state is broken down into separate, self-contained **entities** (`form`, `list`, `footer`), rather than one monolithic reducer.
   - `form`: Manages the input value.
   - `list`: Manages the array of tasks.
   - `footer`: Manages the activeFilter state.

2. **Event-Driven Communication (The `notify` pattern)**:
   - Components use `useNotify()` to report generic events (e.g., `"formSubmit"`, `"toggleClick"`).
   - The state manager's `types` structure determines which entities listen to which events. For example, the `form` entity listens to `"formSubmit"` to clear the input, while the `list` entity also listens to `"formSubmit"` to add the new task. This enables clean, cross-entity communication.

3. **Modern React Hooks**: The application relies entirely on the `Provider`, `useSelector`, and `useNotify` hooks provided by `@inglorious/react-store` for seamless component-to-store interaction.

## 🚀 Getting Started

This project was bootstrapped using `pnpm create vite@latest`.

### Prerequisites

You need a recent version of [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) (or npm/yarn).

### 1. Installation

```bash
# Clone the repository (if not already done)
git clone https:/github.com/IngloriousCoderz/inglorious-engine
cd examples/apps/todomvc

# Install dependencies
pnpm install
```

### 2. Running the Application

Use the standard Vite development command:

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

The state management files are all contained within the `src/store/` directory:

| File                     | Purpose                                                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `src/store/index.js`     | Store Setup. Creates the core store and exposes the React hooks (`Provider`, `useSelector`, `useNotify`). Includes DevTools integration. |
| `src/store/entities.js`  | Initial State. Defines the initial state structure for all entities (`form`, `list`, `footer`).                                          |
| `src/store/types.js`     | State Handlers/Reducers. Defines how each entity reacts to every possible event (e.g., `list.formSubmit` handles adding tasks).          |
| `src/store/selectors.js` | Data Access. Contains optimized memoized selectors (using `@inglorious/store/select`) for reading complex or derived state.              |

## 💡 How to Debug the State

This demo is set up for easy debugging:

1. Ensure you have the **[Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)** installed in your browser.
2. Open the application and launch the DevTools panel.
3. The integration in `store/index.js` ensures that every `notify()` call appears as an Action in the DevTools, allowing for time-travel debugging and state inspection.
