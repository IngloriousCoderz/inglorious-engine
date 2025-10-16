import "./style.css"

import Footer from "./Footer"
import Form from "./Form"
import List from "./List"
import { Provider } from "./store"

export default function App() {
  return (
    <Provider>
      <h1>todos</h1>
      <Form />
      <List />
      <Footer />
    </Provider>
  )
}
