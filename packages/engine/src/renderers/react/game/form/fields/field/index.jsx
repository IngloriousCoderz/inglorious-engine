import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import classes from "./field.module.scss"

export default function Field({ id, entity }) {
  const { label, inputType, defaultValue = "", ...rest } = entity

  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue, inputType])

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const newValue = parse(event.target, inputType)
    setValue(newValue)
    dispatch({ type: "fieldChange", payload: { id, value: newValue } })
  }

  const handleClick = () => {
    const newValue = defaultValue
    setValue(newValue)
    dispatch({ type: "fieldChange", payload: { id, value: newValue } })
  }

  return (
    <div className={classes.field}>
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        id={id}
        type={inputType}
        value={value}
        checked={value}
        onChange={handleChange}
      />
      <button onClick={handleClick}>&#8634;</button>
    </div>
  )
}

function parse(target, inputType) {
  switch (inputType) {
    case "checkbox":
    case "radio":
      return target.checked

    case "number":
      return Number(target.value)

    default:
      return target.value
  }
}
