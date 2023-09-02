import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import classes from './field.module.scss'

export default function Field({ id, instance }) {
  const { label, inputType, defaultValue, ...rest } = instance

  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
    dispatch({ id: `${id}:change`, payload: newValue })
  }

  const handleClick = () => {
    setValue(defaultValue)
    dispatch({ id: `${id}:change`, payload: defaultValue })
  }

  return (
    <div className={classes.field}>
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        id={id}
        type={inputType}
        value={value}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Reset</button>
    </div>
  )
}
