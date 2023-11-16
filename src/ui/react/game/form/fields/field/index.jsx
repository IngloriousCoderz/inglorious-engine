import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import classes from './field.module.scss'

export default function Field({ id, instance }) {
  const { label, inputType, defaultValue = '', ...rest } = instance

  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue, inputType])

  const notify = useDispatch()

  const handleChange = (event) => {
    const newValue = parse(event.target, inputType)
    setValue(newValue)
    notify({ id: 'field:change', payload: { id, value: newValue } })
  }

  const handleClick = () => {
    const newValue = defaultValue
    setValue(newValue)
    notify({ id: 'field:change', payload: { id, value: newValue } })
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
    case 'checkbox':
    case 'radio':
      return target.checked

    case 'number':
      return Number(target.value)

    default:
      return target.value
  }
}
