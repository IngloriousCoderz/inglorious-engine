import { useNotify, useSelector } from "../store"
import { selectValue } from "../store/selectors"

export default function Form() {
  const notify = useNotify()

  const value = useSelector(selectValue)
  const handleChange = (event) => notify("inputChange", event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    notify("formSubmit", value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="What next?"
        autoFocus
        value={value}
        onChange={handleChange}
      />
      <button disabled={!value.length}>Add</button>
    </form>
  )
}
