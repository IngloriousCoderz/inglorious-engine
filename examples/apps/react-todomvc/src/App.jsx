import "./style.css"

import Footer from "./Footer"
import Form from "./Form"
import List from "./List"
import { Provider } from "react-redux"
import { store } from "./store"

export default function App() {
  return (
    <Provider store={store}>
      <h1>todos</h1>
      <Form />
      <List />
      <Footer />
    </Provider>
  )
}
