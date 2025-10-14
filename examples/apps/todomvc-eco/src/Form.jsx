import { useState } from "react"

import { useNotify } from "./store"

export default function Form() {
  const [inputValue, setInputValue] = useState("")
  const handleChange = (event) => setInputValue(event.target.value)

  const notify = useNotify()

  const handleSubmit = (event) => {
    event.preventDefault()
    notify("formSubmit", inputValue)
    setInputValue("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="What next?"
        autoFocus
        value={inputValue}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  )
}
