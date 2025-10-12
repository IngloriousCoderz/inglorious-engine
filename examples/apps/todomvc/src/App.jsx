import "./style.css"

import Footer from "./Footer"
import Form from "./Form"
import List from "./List"
import { Provider } from "./store"

export default function App() {
  return (
    <Provider>
      <Form />
      <List />
      <Footer />
    </Provider>
  )
}
