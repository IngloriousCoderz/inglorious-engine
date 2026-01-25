# Dashboard Benchmark: React vs Inglorious Web

A real-world performance benchmark comparing React (with and without optimizations) against Inglorious Web framework.

## 🎯 What This Benchmarks

A live-updating dashboard with:

- **1000 rows** of data updating in real-time
- **10 random rows** updated every 10ms (100 updates/second)
- **4 charts** displaying live data
- **Filtering and sorting** capabilities
- **FPS counter** and performance metrics

This simulates real-world scenarios like factory monitoring dashboards, stock tickers, or logistics tracking systems.

## 📊 Results

Benchmark with **1000 rows**, **10ms update interval** (100 updates/second):

| Implementation            | FPS (dev) | FPS (prod) | Bundle Size | Mental Overhead |
| ------------------------- | --------- | ---------- | ----------- | --------------- |
| 🐌 React Naive            | 43        | 100        | 62.32kB     | Low             |
| 🏃 React Memoized         | 97        | 100        | 62.48kB     | High            |
| 🐢 React + Redux          | 26        | 92         | 72.20kB     | Very High       |
| 🚀 Inglorious (no memo)   | 100       | 100        | 15.21kB     | Low             |
| 🚀 Inglorious (with memo) | 100       | 100        | 15.37kB     | Low             |

### Key Findings

✅ **Development experience matters** - Inglorious maintains 100 FPS in dev mode, React struggles (26-43 FPS)  
✅ **Bundle size advantage** - Inglorious is **4-5x smaller** (15KB vs 62-72KB)  
✅ **Production parity** - Both hit 100 FPS in prod, but Inglorious gets there with less code  
✅ **Memoization overhead** - React memoization adds complexity with minimal prod benefit  
✅ **Redux tax** - RTK adds 10KB+ and slower dev performance for "best practices"

## 🎯 What This Means

### For Development

During development, when you're iterating rapidly:

- **React Naive:** Sluggish (43 FPS) - forces you to optimize early
- **React + Redux:** Painful (26 FPS) - constant lag while coding
- **Inglorious:** Smooth (100 FPS) - write code, see results instantly

### For Production

Both frameworks hit 100 FPS, BUT:

- **React:** Achieved through compiler optimizations, memoization tricks, larger bundle
- **Inglorious:** Achieved through architecture, 4x smaller bundle, simpler code

### The Real Cost of React

Even though React catches up in production:

1. **You spent hours adding memoization** that barely helped prod performance
2. **Your bundle is 62-72KB** vs Inglorious's 15KB (slower page loads globally)
3. **Your dev experience was frustrating** (26-43 FPS vs 100 FPS)
4. **Your code is more complex** (dependency arrays, memo wrappers, etc.)
5. **Junior devs will struggle** - memoization is a minefield

### The Inglorious Advantage

- ✅ **Fast from day one** - 100 FPS in dev and prod
- ✅ **Tiny bundle** - 15KB means faster loads on 3G/4G globally
- ✅ **Simple code** - No memoization required, ever
- ✅ **Better DX** - Code without friction, iterate quickly
- ✅ **Junior-friendly** - Naive code is performant code

## 🚀 Quick Start

### Prerequisites

```bash
npm install
```

### Running the Benchmark

1. Open `index.html`
2. **Comment/uncomment** the script you want to test:

```html
<!-- Uncomment ONE of these: -->
<script type="module" src="/src/react/main.jsx"></script>
<!-- <script type="module" src="/src/react-memo/main.jsx"></script> -->
<!-- <script type="module" src="/src/react-redux/main.jsx"></script> -->
<!-- <script type="module" src="/src/inglorious/main.js"></script> -->
<!-- <script type="module" src="/src/inglorious-memo/main.js"></script> -->
```

3. Start the dev server:

```bash
npm run dev
```

4. Open your browser and watch the FPS counter
5. Try different implementations by switching the script tag

### Testing Production Builds

To see production performance:

```bash
npm run build
npm run preview
```

**Note:** React's production build includes:

- Dead code elimination
- Minification
- Optimized reconciliation
- RTK dev middleware removed

Inglorious production build is similar in size because the dev build is already optimized.

### Testing on Slower Machines

For more dramatic differences, test on:

- Lower-end laptops
- Chrome DevTools with CPU throttling (6x slowdown)
- Mobile devices

Or increase the stress by editing the parameters in the `./src/utils.js` file:

```javascript
export const ROWS_TO_GENERATE = 1000
export const ROWS_TO_UPDATE = 10
export const UPDATE_FREQUENCY = 10
```

## 🔍 What Each Implementation Shows

### React Naive (`/src/react/`)

- **No optimization** - Every state change re-renders everything
- **Simple code** - Easy to understand
- **Poor dev performance** - 43 FPS during development
- **Production saves it** - 100 FPS in prod build
- **The problem:** Painful dev experience, Virtual DOM overhead

### React Memoized (`/src/react-memo/`)

- **Fully optimized** - `React.memo`, `useMemo`, `useCallback` everywhere
- **Complex code** - Dependency arrays, custom comparators
- **Better dev performance** - 97 FPS
- **Same prod performance** - 100 FPS (minimal gain for all the effort)
- **The tradeoff:** Hours of optimization work for 3 FPS dev improvement

### React + Redux (`/src/react-redux/`)

- **"Best practices"** - Redux Toolkit with `createSelector`
- **Most boilerplate** - slices, actions, reducers, selectors
- **Worst dev performance** - 26 FPS (slower than naive!)
- **Larger bundle** - 72KB vs 62KB for plain React
- **The reality:** More code, worse results, painful dev experience

### Inglorious (no memo) (`/src/inglorious/`)

- **No memoization** - Straightforward entity-based architecture
- **Clean code** - Separation of data (entities) and behavior (types)
- **Peak performance** - 100 FPS in dev and prod
- **Tiny bundle** - 15KB
- **The point:** Fast by default, no tricks needed

### Inglorious (with memo) (`/src/inglorious-memo/`)

- **Optional memoization** - Uses `createSelector()` for derived state
- **Same performance** - Still 100 FPS
- **Same bundle size** - 15KB (negligible difference)
- **The lesson:** Memoization is a convenience, not a requirement

## 💡 Key Concepts Demonstrated

### Why React Struggles in Development

1. **Virtual DOM overhead** - Dev builds include extra checks and warnings
2. **Cascade re-renders** - Parent updates trigger children unnecessarily
3. **RTK middleware** - Redux dev tools add significant overhead
4. **Framework complexity** - Lifecycle hooks, dependency tracking

### Why Inglorious Web Excels

1. **No Virtual DOM** - Direct DOM updates via lit-html
2. **Entity-Component-System** - Clean separation of concerns
3. **Fast by default** - No optimization tricks required
4. **Optimized from the start** - Dev and prod builds are similar
5. **Simple mental model** - Mutate state, framework handles the rest

### Bundle Size Impact

- **15KB vs 62KB** = 47KB savings
- On 3G: ~500ms faster load time
- Critical for global audiences (India, Brazil, Africa, rural areas)
- Better Core Web Vitals scores out of the box

## 🎓 Learning Resources

- [Inglorious Web Documentation](https://github.com/IngloriousCoderz/inglorious-forge/blob/main/packages/web/README.md)
- [Inglorious Store Documentation](https://github.com/IngloriousCoderz/inglorious-forge/blob/main/packages/store/README.md)
- [ECS Architecture Explained](https://en.wikipedia.org/wiki/Entity_component_system)

## 📝 License

MIT

## 🤝 Contributing

This benchmark is designed to be fair and accurate. If you see opportunities to improve any implementation while keeping the comparison valid, PRs are welcome!

### Guidelines for Contributions

- Keep implementations comparable (same features, same data)
- No artificial handicaps
- Document any optimization techniques used
- Update benchmark results with your hardware specs

## 🖥️ Hardware Used for Results

Results above were measured on:

- **Device:** MacBook Pro 16in 2023
- **Browser:** Chrome 144
- **Node:** v22 with Vite dev server
- **OS:** macOS Tahoe

Your results may vary based on hardware. Test on multiple devices!

## ❓ FAQ

**Q: Why is Redux slower than naive React in development?**  
A: Redux adds dev middleware for time-travel debugging, immutability checks, and state serialization. These are helpful for debugging but add significant overhead during development.

**Q: React hits 100 FPS in production. Doesn't that mean it's just as good?**  
A: Production parity doesn't tell the full story:

- Your dev experience was painful (26-43 FPS vs 100 FPS)
- You shipped 4x more JavaScript (62-72KB vs 15KB)
- You spent hours adding memoization that barely helped
- Your code is more complex and harder to maintain
- Junior devs will struggle with the optimization burden

**Q: Is memoization ever useful in Inglorious?**  
A: Yes! Use `createSelector()` for genuinely expensive calculations (complex data transformations, heavy algorithms). But you don't need it for basic rendering performance like you do in React.

**Q: How do I measure FPS on my machine?**  
A: Each implementation has a built-in FPS counter in the top-right. Watch it for 30 seconds to see stable performance. The browser's Performance tab also shows detailed frame timing.

**Q: Can I use this in production?**  
A: This is a benchmark/demo. For production apps, use the actual Inglorious Web framework from npm: `npm install @inglorious/web`

**Q: What about React 19's automatic memoization?**  
A: React 19's compiler helps, but:

- It doesn't eliminate Virtual DOM overhead
- Bundle size remains the same
- You're trusting a black box vs understanding your architecture
- Inglorious is already this fast without compiler magic

**Q: Why not compare against Svelte, Solid, or other modern frameworks?**  
A: Great idea! PRs welcome. This benchmark focuses on React because it's the most widely used and represents the current industry standard.

We'd love to see comparisons with other frameworks. Our expectations:

- **Svelte/Solid:** Likely slightly better performance than Inglorious Web (runes are fast!), but at what cost?
  - Component-centric architecture scatters state across components
  - Signal-based reactivity requires tracking dependencies
  - Lifecycle events and component lifecycle complexity
  - **Requires compilation** - you can't run Svelte in the browser directly
  - Inglorious philosophy: "Good enough performance without compilation > marginally better performance with compilation"

- **Vue:** Likely similar tradeoffs to Svelte - good performance, but component-centric with Options/Composition API complexity

- **Qwik:** Interesting resumability model, but still component-centric and requires heavy build tooling

**Inglorious's differentiator isn't just speed** - it's the combination of:

- ✅ Entity-based, event-driven architecture (state lives in the store, not scattered in components)
- ✅ No compilation required (can run directly in browsers via import maps)
- ✅ No lifecycle events (components are pure render functions)
- ✅ Predictable, explicit behavior (no magic reactivity tracking)
- ✅ "Good enough" is enough (100 FPS without build tools beats 105 FPS with webpack/vite/rollup)

If you value **architectural clarity and zero build complexity** over squeezing out the last 5% of performance, Inglorious Web wins. If you need every millisecond, Svelte might edge ahead - but you'll pay for it in tooling complexity.

## 📢 Feedback

Found this useful? Have questions? Open an issue or reach out!

---

**TL;DR:**

React needs manual optimization to be fast in development. Even with optimization, it ships 4x more JavaScript. Inglorious is fast by default in dev and prod, with a fraction of the bundle size and zero memoization required. Same features, better performance, simpler code. 🚀
