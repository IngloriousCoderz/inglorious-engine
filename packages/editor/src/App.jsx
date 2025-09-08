import "./App.css"

import { PropertyGrid } from "./components/property-grid"
import { PlainObject } from "./components/property-grid/property-grid.stories"

function App() {
  return (
    <main className="container">
      <PropertyGrid {...PlainObject.args} />
    </main>
  )
}

export default App
