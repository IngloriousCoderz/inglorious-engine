import "./style.css"

import { Provider } from "react-redux"

import Footer from "./Footer"
import Form from "./Form"
import List from "./List"
import { store } from "./store"

const ONE_SECOND = 1000
const FPS = 30

setInterval(() => store.update(), ONE_SECOND / FPS)

export default function App() {
  return (
    <Provider store={store}>
      <Form />
      <List />
      <Footer />
    </Provider>
  )
}
